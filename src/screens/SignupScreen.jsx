import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { toReadableError } from '../utils/errorText';

export default function SignupScreen() {
  const nav = useNavigate();
  const { signUpWithPassword } = useApp();
  const [mode, setMode] = useState('email');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const onSignup = async () => {
    setError(''); setMsg('');
    if (!name.trim() || !password.trim()) {
      return setError('Enter name and password');
    }
    try {
      const normalizedPhone = phone.trim() ? (phone.startsWith('+') ? phone.trim() : `+${phone.trim()}`) : '';
      if (mode === 'email' && !email.trim()) {
        return setError('Email is required for email signup');
      }
      if (mode === 'phone' && !phone.trim()) {
        return setError('Phone is required for phone signup');
      }
      await signUpWithPassword({
        email: mode === 'email' ? email.trim() : undefined,
        phone: mode === 'phone' ? normalizedPhone : undefined,
        password,
        displayName: name.trim(),
      });
      setMsg(mode === 'email'
        ? 'Account created. If email verification is enabled, verify email and login.'
        : 'Account created. If phone verification is enabled, verify phone and login.');
    } catch (e) {
      setError(toReadableError(e));
    }
  };

  return (
    <div className="screen">
      <h2>Create Account</h2>
      <div className="chips">
        <button className={mode==='email'?'tab-btn active':'tab-btn'} onClick={()=>setMode('email')}>Email Signup</button>
        <button className={mode==='phone'?'tab-btn active':'tab-btn'} onClick={()=>setMode('phone')}>Phone Signup</button>
      </div>
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Display name" />
      {mode === 'email' ? (
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      ) : (
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone (+91...)" />
      )}
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      <button onClick={onSignup}>Sign up</button>
      {msg && <small>{msg}</small>}
      {error && <small className="danger">{error}</small>}
      <button className="ghost" onClick={()=>nav('/login')}>Back to Login</button>
    </div>
  );
}
