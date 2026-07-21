import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, PROMO_LABEL } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { BASE_URL } from '../config';
import { usePageTitle } from '../hooks/usePageTitle';
import './CheckoutPage.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  usePageTitle('Checkout');
  const { cart, removeFromCart, clearCart, subtotal, discount, promoApplied, total: cartTotal } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const total = cartTotal.toFixed(2);

  const handleStripePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');

    try {
      const { data } = await axios.post(`${BASE_URL}/create-payment-intent`, {
        amount: Math.round(total * 100),
        email,
        items: cart.map((item) => ({ title: item.title, price: item.price })),
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { email },
        },
      });

      if (error) {
        setMessage(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        setMessage('Payment successful!');
        clearCart();
      }
    } catch {
      setMessage('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  const handlePayPalSuccess = (details) => {
    setMessage(`Transaction completed by ${details.payer.name.given_name}`);
    clearCart();
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <div className="cart-container">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <div className="checkout-empty">
              <p className="message">Your cart is empty.</p>
              <Link to="/browse" className="btn-primary">Browse Beats</Link>
            </div>
          ) : (
            <>
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <p>
                      <strong>{item.title}</strong> by {item.artist} — ${item.price}
                    </p>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              {promoApplied && (
                <div className="checkout-totals">
                  <p>Subtotal: ${subtotal.toFixed(2)}</p>
                  <p className="checkout-discount">{PROMO_LABEL}: −${discount.toFixed(2)}</p>
                </div>
              )}
              <h3>Total: ${total}</h3>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <>
            <form onSubmit={handleStripePayment}>
              <div className="form-group">
                <label htmlFor="checkout-email">Email</label>
                <input
                  id="checkout-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Card Details</label>
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
              </div>
              <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay with Card'}
              </button>
            </form>

            <div className="paypal-section">
              <h3>Or pay with PayPal</h3>
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={(data, actions) => {
                  setLoading(true);
                  return actions.order.create({
                    purchase_units: [{ amount: { value: total } }],
                  });
                }}
                onApprove={(data, actions) =>
                  actions.order.capture().then((details) => {
                    setLoading(false);
                    handlePayPalSuccess(details);
                  })
                }
                onCancel={() => {
                  setLoading(false);
                  setMessage('Payment canceled. You can try again.');
                }}
                onError={() => {
                  setLoading(false);
                  setMessage('PayPal payment failed. Please try again.');
                }}
              />
            </div>
          </>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

const CheckoutWrapper = () => (
  <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID, currency: 'USD' }}>
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  </PayPalScriptProvider>
);

export default CheckoutWrapper;
