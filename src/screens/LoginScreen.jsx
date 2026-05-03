import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePhone } from '../utils/validators';
import { useApp } from '../state/AppContext';

export default function LoginScreen() {
  const nav = useNavigate();
  const { requestOtp, isAuthenticated, hasProfile } = useApp();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && hasProfile) {
      nav('/');
    }
  }, [isAuthenticated, hasProfile, nav]);

  const onNext = async () => {
    if (!validatePhone(phone)) return setError('Phone must be at least 10 digits');
    setError('');
    setLoading(true);
    try {
      const normalized = `+91${phone.replace(/\D/g, '')}`;
      await requestOtp(normalized);
      sessionStorage.setItem('tmp_phone', normalized);
      nav('/otp');
    } catch (e) {
      const msg = (e && e.message) || 'Failed to send OTP';
      if (msg.toLowerCase().includes('failed to fetch')) {
        setError('Network error: check VITE_SUPABASE_URL, internet, and Supabase Auth phone settings.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return <div className="screen"><h2>Welcome to ChatNova</h2><p>Enter your phone number to continue</p><div className="row"><span>+91</span><input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone number" /></div>{error && <small className="danger">{error}</small>}<button onClick={onNext} disabled={loading}>{loading ? 'Sending OTP...' : 'Continue'}</button><small>By continuing, you agree to Terms and Privacy.</small></div>;
}
