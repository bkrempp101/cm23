import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastProvider } from "@/components/ui/toast";
import Navigation from './Navigation';
import LoginSignup from './LoginSignup';
import ChatView from './ChatView';
import EmailManagement from './EmailManagement';
import UserSettings from './UserSettings';
import { User } from '@/types';
import { handleApiError } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/actions';
import { RootState } from '@/store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('/api/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const userData = await handleApiError(response);
          dispatch(setUser(userData));
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ToastProvider>
      <Router>
        {user ? (
          <>
            <Navigation />
            <Switch>
              <Route path="/chat" component={ChatView} />
              <Route path="/email" component={EmailManagement} />
              <Route path="/settings" component={UserSettings} />
              <Redirect to="/chat" />
            </Switch>
          </>
        ) : (
          <Route path="/" component={LoginSignup} />
        )}
      </Router>
    </ToastProvider>
  );
};

export default App;
