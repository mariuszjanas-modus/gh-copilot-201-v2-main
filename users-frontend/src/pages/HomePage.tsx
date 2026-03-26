import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to Users Management</h1>
        <p className="home-description">
          A modern and responsive application to manage and view user data.
          Built with React, TypeScript, and Vite.
        </p>
        <Link to="/users" className="cta-button">
          View Users
        </Link>
      </div>
      <div className="gdpr-disclaimer">
        <span className="gdpr-icon">🔒</span>
        <div className="gdpr-text">
          <strong>GDPR Notice:</strong> This application processes personal data
          in accordance with the General Data Protection Regulation (GDPR).
          User data displayed here is used solely for management purposes and is
          handled securely. You have the right to access, rectify, or erase your
          personal data at any time. For more information, please contact our{' '}
          <a href="mailto:privacy@example.com" className="gdpr-link">
            Data Protection Officer
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default HomePage;
