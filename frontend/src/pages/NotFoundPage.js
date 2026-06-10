import React from 'react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import './ContentPages.css';

const NotFoundPage = () => {
  usePageTitle('Page Not Found');

  return (
    <div className="content-page">
      <div className="page-shell content-page-inner not-found-page">
        <h1>404</h1>
        <p className="content-lead">This page doesn&apos;t exist.</p>
        <Link to="/browse" className="btn-primary">Back to Browse</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
