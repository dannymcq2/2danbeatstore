require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const axios = require('axios');

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL in production
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(express.json());

// Debug Route (Optional)
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Stripe Payment Intent Endpoint
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  console.log('Received amount:', amount);
  console.log('Stripe Key present:', !!process.env.STRIPE_SECRET_KEY);

  try {
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).send({ error: 'Invalid amount provided' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).send({ error: 'Failed to create payment intent' });
  }
});

// PayPal Order Creation Endpoint
app.post('/create-paypal-order', async (req, res) => {
  try {
    const { items, total } = req.body;

    // Validate total amount based on items
    const calculatedTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    if (parseFloat(calculatedTotal) !== parseFloat(total)) {
      return res.status(400).send({ error: 'Invalid total amount' });
    }

    // Get an access token from PayPal
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');

    const tokenResponse = await axios.post(
      'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Create the PayPal order
    const orderResponse = await axios.post(
      'https://api-m.sandbox.paypal.com/v2/checkout/orders',
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: total,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(orderResponse.data);
  } catch (error) {
    console.error('Error creating PayPal order:', error.message);
    res.status(500).send({ error: 'Failed to create PayPal order' });
  }
});

// Simulated Checkout Endpoint
app.post('/checkout', (req, res) => {
  const { email, customerInfo, paymentMethod, items, total } = req.body;

  try {
    if (!email || !items || items.length === 0) {
      return res.status(400).send({ error: 'Invalid checkout data' });
    }

    // Log the order for debugging (You can save this to a database)
    console.log('Order received:', { email, customerInfo, paymentMethod, items, total });

    // Simulate success response
    res.status(200).json({ message: 'Order processed successfully!' });
  } catch (error) {
    console.error('Error processing checkout:', error.message);
    res.status(500).send({ error: 'Failed to process checkout' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on ${PORT}`);
});