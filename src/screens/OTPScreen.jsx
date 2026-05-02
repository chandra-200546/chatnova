import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateOtp } from '../utils/validators';
import { useApp } from '../state/AppContext';

export default function OTPScreen() {
  const nav = useNavigate();
  const { verifyOtp } = useApp();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onVerify = async () => {
    if (!validateOtp(otp)) return setError('Enter valid 6-digit OTP');
    setLoading(true);
    setError('');
    try {
      const phone = sessionStorage.getItem('tmp_phone');
      if (!phone) throw new Error('Phone number missing. Please login again.');
      await verifyOtp(phone, otp);
      nav('/profile-setup');
    } catch (e) {
      setError(e.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return <div className="screen"><h2>Verify OTP</h2><p>Enter the 6-digit code</p><input value={otp} onChange={(e)=>setOtp(e.target.value)} maxLength={6} className="otp" />{error && <small className="danger">{error}</small>}<button onClick={onVerify} disabled={loading}>{loading ? 'Verifying...' : 'Verify'}</button><button onClick={()=>nav('/login')} className="ghost">Back</button></div>;
}
