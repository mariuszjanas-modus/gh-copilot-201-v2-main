import { useState, useEffect } from 'react';
import type { User } from '../types/User';
import { getAllUsers } from '../services/userService';
import UsersTable from '../components/users/UsersTable';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import './UsersPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchUsers} />;
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h2>All Users</h2>
        <p className="users-count">{users.length} users found</p>
      </div>
      <UsersTable users={users} />
    </div>
  );
};

export default UsersPage;
