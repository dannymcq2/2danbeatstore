import React from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import './ContentPages.css';

const AboutPage = () => {
  usePageTitle('About');

  return (
    <div className="content-page about-page">
      <div className="page-shell content-page-inner">
        <p className="content-eyebrow">About</p>
        <h1>Built for artists who need heat</h1>
        <p className="content-lead">
          2Dan Beats is an independent producer store offering hard-hitting,
          melody-driven instrumentals for rappers, singers, and content creators.
        </p>

        <div className="about-grid">
          <div className="content-card">
            <h2>The sound</h2>
            <p>
              Dark trap, bouncy club records, smooth R&B textures, and aggressive
              street beats — each track is mixed and ready for vocals.
            </p>
          </div>
          <div className="content-card">
            <h2>How it works</h2>
            <p>
              Preview any beat, pick your license, and checkout securely. After
              purchase you&apos;ll receive your files and license terms by email.
            </p>
          </div>
          <div className="content-card">
            <h2>Custom work</h2>
            <p>
              Need something specific? Reach out for custom production, exclusives,
              or bulk deals.
            </p>
            <Link to="/contact" className="text-link">Get in touch →</Link>
          </div>
        </div>

        <div className="about-cta">
          <Link to="/browse" className="btn-primary">Browse the catalog</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
