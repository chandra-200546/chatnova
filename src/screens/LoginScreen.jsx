import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePhone } from '../utils/validators';
import { useApp } from '../state/AppContext';

export default function LoginScreen() {
  const nav = useNavigate();
  const { requestOtp, signInWithPassword, isAuthenticated, hasProfile } = useApp();
  const [mode, setMode] = useState('otp');
  const [phone, setPhone] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
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
      setError(e.message || 'Failed to send OTP');
    } finally { setLoading(false); }
  };

  const onPasswordLogin = async () => {
    if (!identifier.trim() || !password.trim()) return setError('Enter credentials');
    setLoading(true); setError('');
    try {
      await signInWithPassword({ emailOrPhone: identifier.trim(), password });
      nav('/');
    } catch (e) {
      setError(e.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="screen">
      <h2>Welcome to ChatNova</h2>
      <p>Choose login method</p>
      <div className="chips">
        <button className={mode==='otp'?'tab-btn active':'tab-btn'} onClick={()=>setMode('otp')}>Phone OTP</button>
        <button className={mode==='phonepass'?'tab-btn active':'tab-btn'} onClick={()=>setMode('phonepass')}>Phone + Password</button>
        <button className={mode==='emailpass'?'tab-btn active':'tab-btn'} onClick={()=>setMode('emailpass')}>Email + Password</button>
      </div>

      {mode === 'otp' && <><div className="row"><span>+91</span><input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone number" /></div><button onClick={onOtp} disabled={loading}>{loading ? 'Sending OTP...' : 'Continue'}</button></>}
      {mode === 'phonepass' && <><input value={identifier} onChange={(e)=>setIdentifier(e.target.value)} placeholder="Phone (+9198...)" /><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" /><button onClick={onPasswordLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button></>}
      {mode === 'emailpass' && <><input value={identifier} onChange={(e)=>setIdentifier(e.target.value)} placeholder="Email" /><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" /><button onClick={onPasswordLogin} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button></>}

      {error && <small className="danger">{error}</small>}
      <small>By continuing, you agree to Terms and Privacy.</small>
      <button className="ghost" onClick={()=>nav('/signup')}>Create Account</button>
    </div>
  );
}
