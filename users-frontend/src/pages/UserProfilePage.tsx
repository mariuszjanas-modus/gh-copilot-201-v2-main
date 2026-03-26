import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { User } from '../types/User';
import { getUserById } from '../services/userService';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import './UserProfilePage.css';

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    if (!userId) {
      setError('User ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getUserById(parseInt(userId, 10));
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleBackClick = () => {
    navigate('/users');
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchUser} />;
  }

  if (!user) {
    return <ErrorMessage message="User not found" onRetry={fetchUser} />;
  }

  return (
    <div className="user-profile-page">
      <div className="profile-header">
        <button onClick={handleBackClick} className="back-button">
          ← Back to Users
        </button>
        <h2>User Profile</h2>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-section">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
            <span className={`role-badge role-${user.role}`}>{user.role}</span>
          </div>

          <div className="profile-details">
            <div className="profile-section">
              <h3>Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="info-item">
                  <label>Username</label>
                  <p>{user.username}</p>
                </div>
                <div className="info-item">
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
                <div className="info-item">
                  <label>Phone</label>
                  <p>{user.phone}</p>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>About</h3>
              <p className="bio">{user.bio}</p>
            </div>

            <div className="profile-section">
              <h3>Company</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Company Name</label>
                  <p>{user.company.name}</p>
                </div>
                <div className="info-item">
                  <label>Position</label>
                  <p>{user.company.position}</p>
                </div>
                <div className="info-item">
                  <label>Department</label>
                  <p>{user.company.department}</p>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Address</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Street</label>
                  <p>{user.address.street}</p>
                </div>
                <div className="info-item">
                  <label>City</label>
                  <p>{user.address.city}</p>
                </div>
                <div className="info-item">
                  <label>State</label>
                  <p>{user.address.state}</p>
                </div>
                <div className="info-item">
                  <label>Zip Code</label>
                  <p>{user.address.zipCode}</p>
                </div>
                <div className="info-item">
                  <label>Country</label>
                  <p>{user.address.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
