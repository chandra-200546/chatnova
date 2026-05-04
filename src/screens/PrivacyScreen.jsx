import { useMemo, useState } from 'react';
import { useApp } from '../state/AppContext';

const visibilityOptions = ['Everyone', 'My Contacts', 'Nobody'];

const defaults = {
  last_seen: 'Everyone',
  profile_photo: 'Everyone',
  about: 'Everyone',
  status: 'Everyone',
  read_receipts: true,
  app_lock: false,
  app_lock_pin: '',
  blocked_contacts: [],
};

export default function PrivacyScreen() {
  const { contacts } = useApp();
  const [active, setActive] = useState('last_seen');
  const [privacy, setPrivacy] = useState(() => {
    const raw = localStorage.getItem('chatnova_privacy_v2');
    if (!raw) return defaults;
    try { return { ...defaults, ...JSON.parse(raw) }; } catch { return defaults; }
  });
  const [pinInput, setPinInput] = useState('');

  const save = (next) => {
    setPrivacy(next);
    localStorage.setItem('chatnova_privacy_v2', JSON.stringify(next));
  };

  const setVisibility = (key, value) => save({ ...privacy, [key]: value });
  const toggleReadReceipts = () => save({ ...privacy, read_receipts: !privacy.read_receipts });
  const toggleBlock = (id) => {
    const blocked = privacy.blocked_contacts.includes(id)
      ? privacy.blocked_contacts.filter((x) => x !== id)
      : [...privacy.blocked_contacts, id];
    save({ ...privacy, blocked_contacts: blocked });
  };

  const setAppLock = () => {
    if (!privacy.app_lock) {
      if (pinInput.length < 4) return;
      save({ ...privacy, app_lock: true, app_lock_pin: pinInput });
      setPinInput('');
      return;
    }
    if (pinInput !== privacy.app_lock_pin) return;
    save({ ...privacy, app_lock: false, app_lock_pin: '' });
    setPinInput('');
  };

  const blockedSet = useMemo(() => new Set(privacy.blocked_contacts), [privacy.blocked_contacts]);

  const rows = [
    ['last_seen', 'Last seen'],
    ['profile_photo', 'Profile photo'],
    ['about', 'About'],
    ['status', 'Status'],
    ['read_receipts', 'Read receipts'],
    ['blocked_contacts', 'Blocked contacts'],
    ['app_lock', 'App lock'],
  ];

  return (
    <main className="screen-page">
      <h2>Privacy</h2>
      {rows.map(([key, label]) => (
        <button className="settings-item" key={key} onClick={() => setActive(key)}>
          <span>{label}</span>
          <span>
            {key === 'read_receipts' ? (privacy.read_receipts ? 'On' : 'Off') :
             key === 'blocked_contacts' ? `${privacy.blocked_contacts.length} blocked` :
             key === 'app_lock' ? (privacy.app_lock ? 'On' : 'Off') :
             privacy[key]}
          </span>
        </button>
      ))}

      <div className="announcement">
        {active !== 'blocked_contacts' && active !== 'app_lock' && active !== 'read_receipts' && (
          <>
            <strong>Visibility for {active.replace('_', ' ')}</strong>
            <div className="chips" style={{ marginTop: 8 }}>
              {visibilityOptions.map((opt) => (
                <button
                  key={opt}
                  className={privacy[active] === opt ? 'tab-btn active' : 'tab-btn'}
                  onClick={() => setVisibility(active, opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}

        {active === 'read_receipts' && (
          <button className="settings-item" onClick={toggleReadReceipts}>
            <span>Read receipts</span><span>{privacy.read_receipts ? 'ON' : 'OFF'}</span>
          </button>
        )}

        {active === 'blocked_contacts' && (
          <div>
            <strong>Manage blocked contacts</strong>
            <div style={{ marginTop: 8 }}>
              {contacts.length === 0 && <small>No contacts found.</small>}
              {contacts.map((c) => (
                <button key={c.id} className="settings-item" onClick={() => toggleBlock(c.id)}>
                  <span>{c.name}</span><span>{blockedSet.has(c.id) ? 'Unblock' : 'Block'}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {active === 'app_lock' && (
          <div>
            <strong>App lock</strong>
            <p style={{ color: 'var(--muted)', margin: '6px 0' }}>
              {privacy.app_lock ? 'Enter current PIN to disable lock.' : 'Set a 4+ digit PIN to enable app lock.'}
            </p>
            <input value={pinInput} onChange={(e) => setPinInput(e.target.value)} placeholder="Enter PIN" type="password" />
            <button onClick={setAppLock} style={{ marginTop: 8 }}>
              {privacy.app_lock ? 'Disable App Lock' : 'Enable App Lock'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
