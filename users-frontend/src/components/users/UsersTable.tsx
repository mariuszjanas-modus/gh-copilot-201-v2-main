import type { User } from '../../types/User';
import './UsersTable.css';

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const getRoleBadgeClass = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'role-badge admin';
      case 'moderator':
        return 'role-badge moderator';
      default:
        return 'role-badge user';
    }
  };

  return (
    <div className="table-container">
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <span className={getRoleBadgeClass(user.role)}>
                  {user.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
