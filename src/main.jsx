import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider, useApp } from './state/AppContext';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';
import './styles.css';

function Root() {
  const { loading, isAuthenticated, hasProfile } = useApp();
  if (loading) return <div className="center-screen"><h2>Loading ChatNova...</h2></div>;
  if (!isAuthenticated) return <AuthNavigator />;
  if (!hasProfile) return <AuthNavigator />;
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
