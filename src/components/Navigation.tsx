import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/store/actions';

const Navigation: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    history.push('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Care Manager</div>
        <div className="space-x-4">
          <Link to="/chat" className="hover:text-gray-300">Chat</Link>
          <Link to="/email" className="hover:text-gray-300">Email</Link>
          <Link to="/settings" className="hover:text-gray-300">Settings</Link>
          <Button onClick={handleLogout} variant="outline" className="text-white border-white hover:bg-gray-700">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
