import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../state/AppContext';

export default function AccountScreen() {
  const nav = useNavigate();
  const { profile, completeProfile } = useApp();
  const [name, setName] = useState(profile?.display_name || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [msg, setMsg] = useState('');
  return <main className="screen-page"><h2>Account</h2><input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Display name" /><input value={bio} onChange={(e)=>setBio(e.target.value)} placeholder="Bio" /><button onClick={async()=>{ await completeProfile({ name, bio, phone: profile?.phone }); setMsg('Saved'); }}>Save</button>{msg && <small>{msg}</small>}<button className="ghost" onClick={()=>nav('/settings')}>Back</button></main>;
}
