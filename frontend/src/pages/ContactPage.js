import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div>
        <h1>Contact Us</h1>
        <p>We’d love to hear from you!</p>
        <ul className="contact-list">
          <li>Email: <a href="mailto:prod2danbeats@gmail.com">prod2danbeats@gmail.com</a></li>
          <li>Instagram: <a href="https://www.instagram.com/prod2dan/">@prod2dan</a></li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;