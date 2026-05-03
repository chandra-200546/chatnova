import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';

export default function ProfileSetupScreen() {
  const nav = useNavigate();
  const { completeProfile, isAuthenticated, hasProfile } = useApp();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && hasProfile) {
      nav('/');
    }
  }, [isAuthenticated, hasProfile, nav]);

  const onSave = async () => {
    if (!name.trim()) return setError('Name is required');
    setError('');
    setLoading(true);
    try {
      await completeProfile({
        name: name.trim(),
        bio: bio.trim() || 'Hey there! I am on ChatNova.',
        phone: sessionStorage.getItem('tmp_phone') || null,
      });
      nav('/');
    } catch (e) {
      setError(e.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return <div className="screen"><h2>Set up your profile</h2><input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} /><input placeholder="Bio / Status" value={bio} onChange={(e)=>setBio(e.target.value)} />{error && <small className="danger">{error}</small>}<button onClick={onSave} disabled={loading}>{loading ? 'Saving...' : 'Continue'}</button></div>;
}
