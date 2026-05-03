import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';

export default function SplashScreen() {
  const nav = useNavigate(); const { isAuthenticated, hasProfile } = useApp();
  useEffect(() => {
    const t = setTimeout(() => {
      if (!isAuthenticated) nav('/login');
      else if (!hasProfile) nav('/profile-setup');
      else nav('/');
    }, 1200);
    return () => clearTimeout(t);
  }, [isAuthenticated, hasProfile, nav]);
  return <div className="center-screen"><h1>ChatNova</h1><p>Secure. Smart. Connected.</p><small>Loading...</small></div>;
}
