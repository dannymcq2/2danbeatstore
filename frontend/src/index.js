import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { AudioPlayerProvider } from './context/AudioPlayerContext';

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <AudioPlayerProvider>
      <App />
    </AudioPlayerProvider>
  </CartProvider>
);
