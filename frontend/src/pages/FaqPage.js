import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import './ContentPages.css';

const faqs = [
  {
    q: 'What license should I choose?',
    a: 'MP3 Lease is great for demos and smaller releases. WAV Lease gives you higher quality and more usage rights. Exclusive transfers full ownership and removes the beat from the store.',
  },
  {
    q: 'How do I credit the producer?',
    a: 'For leased beats, credit as "Prod. by 2Dan" in your track title or description. Full credit requirements are included with your license file.',
  },
  {
    q: 'When do I get my files?',
    a: 'Immediately after successful payment. You\'ll receive a download link and license PDF via email. (Delivery is being finalized — cart preview is live now.)',
  },
  {
    q: 'Can I get a refund?',
    a: 'Because beats are digital goods, all sales are final once files are delivered. Contact us if there\'s a technical issue with your order.',
  },
  {
    q: 'Do you offer exclusives?',
    a: 'Yes. Select the Exclusive license on any beat detail page. Once sold, that beat is removed from the catalog.',
  },
];

const licenses = [
  {
    name: 'MP3 Lease',
    price: 'From base price',
    includes: ['Tagged MP3', '50k stream cap', 'Non-profit use'],
  },
  {
    name: 'WAV Lease',
    price: '2× base price',
    includes: ['Untagged WAV', '150k stream cap', 'Music videos allowed'],
  },
  {
    name: 'Exclusive',
    price: '15× base price',
    includes: ['Full ownership', 'Beat removed from store', 'Unlimited use'],
  },
];

const FaqPage = () => {
  usePageTitle('FAQ & Licensing');

  return (
    <div className="content-page faq-page">
      <div className="page-shell content-page-inner">
        <p className="content-eyebrow">FAQ & Licensing</p>
        <h1>Everything you need to know</h1>
        <p className="content-lead">
          Clear licensing keeps both artists and producers protected.
        </p>

        <section className="faq-section">
          <h2 className="section-title">License types</h2>
          <div className="license-grid">
            {licenses.map((license) => (
              <div key={license.name} className="content-card license-card">
                <h3>{license.name}</h3>
                <p className="license-price">{license.price}</p>
                <ul>
                  {license.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <h2 className="section-title">Common questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FaqPage;
