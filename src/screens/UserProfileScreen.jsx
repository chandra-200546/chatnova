import { useApp } from '../state/AppContext';

export default function UserProfileScreen() {
  const { profile } = useApp();
  return <main className="screen-page"><h2>User Profile</h2><div className="profile-card"><div className="avatar xl">{profile?.avatar_url ? <img src={profile.avatar_url} alt="avatar" className="avatar-img" /> : (profile?.display_name || 'ME').slice(0,2).toUpperCase()}</div><h3>{profile?.display_name || 'User'}</h3><p>{profile?.phone || ''}</p><p>{profile?.bio || ''}</p></div><div className="list-card"><h4>Media, links, docs</h4><p>No data yet</p></div><button className="list-card">Mute notifications</button><button className="danger-btn">Block user</button><button className="danger-btn">Report user</button></main>;
}
