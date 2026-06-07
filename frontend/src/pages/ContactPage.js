import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import './ContentPages.css';
import './ContactPage.css';

const ContactPage = () => {
  usePageTitle('Contact');

  return (
    <div className="content-page contact-page">
      <div className="page-shell content-page-inner">
        <p className="content-eyebrow">Contact</p>
        <h1>Let&apos;s work</h1>
        <p className="content-lead">
          Questions about licensing, custom beats, or collaborations — reach out.
        </p>

        <div className="contact-cards">
          <a href="mailto:prod2danbeats@gmail.com" className="content-card contact-card">
            <span className="contact-label">Email</span>
            <span className="contact-value">prod2danbeats@gmail.com</span>
          </a>
          <a
            href="https://www.instagram.com/prod2dan/"
            target="_blank"
            rel="noreferrer"
            className="content-card contact-card"
          >
            <span className="contact-label">Instagram</span>
            <span className="contact-value">@prod2dan</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
