require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Set PAYPAL_ENV=live in production once your PayPal app is approved;
// anything else (or unset) uses the sandbox API.
const PAYPAL_API_BASE =
  process.env.PAYPAL_ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

app.use(
  cors({
    origin: ['https://twodanbeatstore.onrender.com', /^http:\/\/localhost:\d+$/],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// ✅ Serve image assets from public/images
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));

app.use(express.json());

// Debug Route (Optional)
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Stripe Payment Intent Endpoint
app.post('/create-payment-intent', async (req, res) => {
  const { amount, email, items } = req.body;

  console.log('Received amount:', amount);
  console.log('Stripe Key present:', !!process.env.STRIPE_SECRET_KEY);

  try {
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).send({ error: 'Invalid amount provided' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      // Shows up in the Stripe dashboard and receipt so you know what was bought
      receipt_email: email || undefined,
      description: Array.isArray(items)
        ? items.map((item) => item.title).join(', ').slice(0, 500)
        : undefined,
      metadata: { email: email || '' },
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

    const calculatedTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    if (parseFloat(calculatedTotal) !== parseFloat(total)) {
      return res.status(400).send({ error: 'Invalid total amount' });
    }

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64');

    const tokenResponse = await axios.post(
      `${PAYPAL_API_BASE}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const orderResponse = await axios.post(
      `${PAYPAL_API_BASE}/v2/checkout/orders`,
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

    console.log('Order received:', { email, customerInfo, paymentMethod, items, total });

    res.status(200).json({ message: 'Order processed successfully!' });
  } catch (error) {
    console.error('Error processing checkout:', error.message);
    res.status(500).send({ error: 'Failed to process checkout' });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on ${PORT}`);
});
