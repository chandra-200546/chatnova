import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animeAvatarOptions } from '../assets/avatars/animeOptions';
import Avatar from '../components/Avatar';
import { useApp } from '../state/AppContext';

export default function AccountScreen() {
  const nav = useNavigate();
  const { profile, completeProfile, uploadAvatar, updateProfile } = useApp();
  const [name, setName] = useState(profile?.display_name || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState('');
  const options = useMemo(() => animeAvatarOptions, []);

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const url = await uploadAvatar(file);
      if (url) setAvatarUrl(url);
      setMsg('Avatar uploaded');
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSave = async () => {
    setError('');
    setMsg('');
    try {
      await completeProfile({ name, bio, phone: profile?.phone, avatarUrl });
      setMsg('Saved');
    } catch (err) {
      setError(err.message || 'Save failed');
    }
  };

  const onSelectAvatar = async (url) => {
    setAvatarUrl(url);
    setMsg('');
    setError('');
    setSavingAvatar(url);
    try {
      await updateProfile({ avatar_url: url });
      setMsg('Avatar updated');
    } catch (err) {
      setError(err.message || 'Failed to save selected avatar');
    } finally {
      setSavingAvatar('');
    }
  };

  return <main className="screen-page"><h2>Account</h2><div className="list-card"><Avatar name={name || profile?.display_name} imageUrl={avatarUrl} /><div><h4>{name || 'User'}</h4><p>{profile?.phone || ''}</p></div></div><input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Display name" /><input value={bio} onChange={(e)=>setBio(e.target.value)} placeholder="Bio" /><label className="settings-item"><span>Upload profile image</span><input type="file" accept="image/*" onChange={onUpload} /></label>{uploading && <small>Uploading...</small>}<h3>Anime Avatar Gallery (120 options)</h3><div className="avatar-grid">{options.map((url) => <button key={url} className={`avatar-pick ${avatarUrl===url?'selected':''}`} onClick={()=>onSelectAvatar(url)}><img src={url} alt="anime avatar" /></button>)}</div>{savingAvatar && <small>Saving selected avatar...</small>}<button onClick={onSave}>Save Profile</button>{msg && <small>{msg}</small>}{error && <small className="danger">{error}</small>}<button className="ghost" onClick={()=>nav('/settings')}>Back</button></main>;
}
