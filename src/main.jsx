import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider, useApp } from './state/AppContext';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';
import './styles.css';

function Root() {
  const { loading, bootError, isAuthenticated, hasProfile } = useApp();
  const [pin, setPin] = React.useState('');
  const [unlocked, setUnlocked] = React.useState(false);
  const privacy = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('chatnova_privacy_v2') || '{}'); } catch { return {}; }
  }, [isAuthenticated, hasProfile]);
  const lockEnabled = !!privacy?.app_lock;

  if (loading) return <div className="center-screen"><h2>Loading ChatNova...</h2><small>Please wait...</small></div>;
  if (bootError) return <div className="center-screen"><h2>Startup issue</h2><small>{bootError}</small><button onClick={() => window.location.reload()}>Retry</button></div>;
  if (!isAuthenticated) return <AuthNavigator />;
  if (!hasProfile) return <AuthNavigator />;
  if (lockEnabled && !unlocked) {
    return <div className="center-screen"><h2>App Lock</h2><input value={pin} onChange={(e) => setPin(e.target.value)} type="password" placeholder="Enter PIN" /><button onClick={() => { if (pin === privacy.app_lock_pin) setUnlocked(true); }}>Unlock</button></div>;
  }
  return <AppNavigator />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Root />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
