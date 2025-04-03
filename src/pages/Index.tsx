
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentDiaryUser');
    if (currentUser) {
      navigate('/diary');
    }
  }, [navigate]);

  return <LoginPage />;
};

export default Index;
