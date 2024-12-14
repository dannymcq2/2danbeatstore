import React from 'react';

const ContactPage = () => {
  return (
    <div className="contact-page" style={{ backgroundColor: 'lightblue', padding: '20px' }}>
      <h1 style={{ color: 'purple' }}>Contact Page</h1>
      <h2>Reach out to us through the following:</h2>
      <ul>
        <li>Email: contact@example.com</li>
        <li>Instagram: @example</li>
        <li>Telegram: @example</li>
      </ul>
    </div>
  );
};

export default ContactPage;