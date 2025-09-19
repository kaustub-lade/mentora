import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {currentUser?.email}</p>
      <p>Welcome, {currentUser?.username}</p>
      <p>Welcome, {currentUser?.password}</p>
      <p>Welcome, {currentUser?.email}</p>
    </div>
  );
};

export default Dashboard;
