import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="app-title">Users Management</h1>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? '☀' : '☾'}
        </button>
      </div>
    </header>
  );
};

export default Header;
