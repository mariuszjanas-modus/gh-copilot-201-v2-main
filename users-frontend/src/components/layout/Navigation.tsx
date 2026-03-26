import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-content">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/users" 
          className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`}
        >
          Users
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
