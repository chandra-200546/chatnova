import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';
import { toReadableError } from '../utils/errorText';

export default function SignupScreen() {
  const nav = useNavigate();
  const { signUpWithPassword } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const onSignup = async () => {
    setError(''); setMsg('');
    if (!name.trim() || !password.trim() || (!email.trim() && !phone.trim())) {
      return setError('Enter name, password and either email or phone');
    }
    try {
      const normalizedPhone = phone.trim() ? (phone.startsWith('+') ? phone.trim() : `+${phone.trim()}`) : '';
      await signUpWithPassword({
        email: email.trim() || undefined,
        phone: normalizedPhone || undefined,
        password,
        displayName: name.trim(),
      });
      setMsg('Account created. If verification is required, complete it and login.');
    } catch (e) {
      setError(toReadableError(e));
    }
  };

  return (
    <div className="screen">
      <h2>Create Account</h2>
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Display name" />
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email (optional)" />
      <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone (optional, +91...)" />
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      <button onClick={onSignup}>Sign up</button>
      {msg && <small>{msg}</small>}
      {error && <small className="danger">{error}</small>}
      <button className="ghost" onClick={()=>nav('/login')}>Back to Login</button>
    </div>
  );
}
