import React, { useState } from 'react';

const CheckoutPage = () => {
  const [email, setEmail] = useState('');
  const [customerInfo, setCustomerInfo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'customerInfo') setCustomerInfo(value);
    if (name === 'paymentMethod') setPaymentMethod(value);
  };

  return (
    <div className="checkout-page" style={{ backgroundColor: 'lightblue', padding: '20px' }}>
      <h1 style={{ color: 'purple' }}>Checkout Page</h1>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Customer Info:</label>
          <textarea name="customerInfo" value={customerInfo} onChange={handleInputChange} />
        </div>
        <div>
          <label>Payment Method:</label>
          <input type="text" name="paymentMethod" value={paymentMethod} onChange={handleInputChange} />
        </div>
        <div>
          <h2>Cart info:</h2>
          <p>[Cart details like total price, selected beats]</p>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;