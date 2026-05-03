import { useMemo, useState } from 'react';

const privacyKeys = [
  { key: 'last_seen', label: 'Last seen' },
  { key: 'profile_photo', label: 'Profile photo' },
  { key: 'about', label: 'About' },
  { key: 'status', label: 'Status' },
  { key: 'read_receipts', label: 'Read receipts' },
  { key: 'blocked_contacts', label: 'Blocked contacts' },
  { key: 'app_lock', label: 'App lock' },
];
const values = ['Everyone', 'My Contacts', 'Nobody'];

export default function PrivacyScreen() {
  const initial = useMemo(() => {
    const raw = localStorage.getItem('chatnova_privacy');
    return raw ? JSON.parse(raw) : {
      last_seen: 'Everyone',
      profile_photo: 'Everyone',
      about: 'Everyone',
      status: 'Everyone',
      read_receipts: 'Everyone',
      blocked_contacts: 'Everyone',
      app_lock: 'Everyone',
    };
  }, []);
  const [privacy, setPrivacy] = useState(initial);

  const nextValue = (current) => {
    const i = values.indexOf(current);
    return values[(i + 1) % values.length];
  };

  const update = (key) => {
    const next = { ...privacy, [key]: nextValue(privacy[key]) };
    setPrivacy(next);
    localStorage.setItem('chatnova_privacy', JSON.stringify(next));
  };

  return <main className="screen-page"><h2>Privacy</h2>{privacyKeys.map((r)=><button className="settings-item" key={r.key} onClick={()=>update(r.key)}><span>{r.label}</span><span>{privacy[r.key]}</span></button>)}<small>Tap a row to change value.</small></main>;
}
