import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { AudioPlayerProvider } from './context/AudioPlayerContext';

ReactDOM.render(
  <CartProvider>
    <AudioPlayerProvider>
      <App />
    </AudioPlayerProvider>
  </CartProvider>,
  document.getElementById('root')
);