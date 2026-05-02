import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';

export default function SplashScreen() {
  const nav = useNavigate(); const { isAuthenticated } = useApp();
  useEffect(() => { const t = setTimeout(() => nav(isAuthenticated ? '/' : '/login'), 2000); return () => clearTimeout(t); }, [isAuthenticated, nav]);
  return <div className="center-screen"><h1>ChatNova</h1><p>Secure. Smart. Connected.</p><small>Loading...</small></div>;
}
