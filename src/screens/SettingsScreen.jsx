import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import SettingsItem from '../components/SettingsItem';
import { useApp } from '../state/AppContext';

export default function SettingsScreen() {
  const nav = useNavigate();
  const { profile, settings, updateSettings, logout } = useApp();

  const toggle = async (key) => {
    if (!settings) return;
    await updateSettings({ [key]: !settings[key] });
  };

  return (
    <main className="screen-page">
      <h2>Settings</h2>
      <div className="list-card"><Avatar name={profile?.display_name || 'Me'} /><div><h4>{profile?.display_name || 'User'}</h4><p>{profile?.phone || ''}</p></div></div>
      <SettingsItem label="Account" right=">" />
      <SettingsItem label="Privacy" right=">" onClick={() => nav('/privacy')} />
      <SettingsItem label="Notifications" right=">" />
      <SettingsItem label="Chat Theme" right=">" onClick={() => nav('/theme')} />
      <SettingsItem label="Storage and Data" right=">" />
      <SettingsItem label="AI Features" right=">" />
      <SettingsItem label="Security" right=">" />
      <SettingsItem label="Help and Support" right=">" />
      <div className="announcement">End-to-end encryption: secure architecture enabled.</div>
      <SettingsItem label="Fingerprint lock" right={settings?.fingerprint_lock ? 'ON' : 'OFF'} onClick={() => toggle('fingerprint_lock')} />
      <SettingsItem label="Private vault chats" right={settings?.private_vault ? 'ON' : 'OFF'} onClick={() => toggle('private_vault')} />
      <SettingsItem label="Disappearing messages" right={settings?.disappearing_messages ? 'ON' : 'OFF'} onClick={() => toggle('disappearing_messages')} />
      <h3>AI Settings</h3>
      <SettingsItem label="Smart replies" right={settings?.smart_replies ? 'ON' : 'OFF'} onClick={() => toggle('smart_replies')} />
      <SettingsItem label="Auto translation" right={settings?.auto_translation ? 'ON' : 'OFF'} onClick={() => toggle('auto_translation')} />
      <SettingsItem label="Spam detection" right={settings?.spam_detection ? 'ON' : 'OFF'} onClick={() => toggle('spam_detection')} />
      <SettingsItem label="Chat summary" right={settings?.chat_summary ? 'ON' : 'OFF'} onClick={() => toggle('chat_summary')} />
      <button className="danger-btn" onClick={async () => { await logout(); nav('/login'); }}>Logout</button>
    </main>
  );
}
