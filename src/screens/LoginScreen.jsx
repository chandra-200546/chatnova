import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePhone } from '../utils/validators';
import { useApp } from '../state/AppContext';
import { toReadableError } from '../utils/errorText';

export default function LoginScreen() {
  const nav = useNavigate();
  const { requestOtp, isAuthenticated, hasProfile } = useApp();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && hasProfile) nav('/');
  }, [isAuthenticated, hasProfile, nav]);

  const onOtp = async () => {
    if (!validatePhone(phone)) return setError('Phone must be at least 10 digits');
    setLoading(true); setError('');
    try {
      const normalized = `+91${phone.replace(/\D/g, '')}`;
      await requestOtp(normalized);
      sessionStorage.setItem('tmp_phone', normalized);
      nav('/otp');
    } catch (e) {
      setError(toReadableError(e));
    } finally { setLoading(false); }
  };

  return (
    <div className="screen">
      <h2>Welcome to ChatNova</h2>
      <p>Enter your phone number to continue</p>
      <div className="row"><span>+91</span><input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone number" /></div>
      <button onClick={onOtp} disabled={loading}>{loading ? 'Sending OTP...' : 'Continue'}</button>
      {error && <small className="danger">{error}</small>}
      <small>By continuing, you agree to Terms and Privacy.</small>
    </div>
  );
}
