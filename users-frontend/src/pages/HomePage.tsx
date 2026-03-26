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
    </div>
  );
};

export default HomePage;
