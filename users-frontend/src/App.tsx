import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import UserProfilePage from './pages/UserProfilePage';
import './App.css';

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:userId" element={<UserProfilePage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;

