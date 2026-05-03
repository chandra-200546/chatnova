import { useApp } from '../state/AppContext';

export default function SecurityScreen() {
  const { settings, updateSettings } = useApp();
  const t = async (key) => updateSettings({ [key]: !settings?.[key] });
  return <main className="screen-page"><h2>Security</h2><div className="announcement">End-to-end encryption enabled at protocol layer plan.</div><button className="settings-item" onClick={()=>t('fingerprint_lock')}><span>Fingerprint lock</span><span>{settings?.fingerprint_lock?'ON':'OFF'}</span></button><button className="settings-item" onClick={()=>t('private_vault')}><span>Private vault chats</span><span>{settings?.private_vault?'ON':'OFF'}</span></button><button className="settings-item" onClick={()=>t('disappearing_messages')}><span>Disappearing messages</span><span>{settings?.disappearing_messages?'ON':'OFF'}</span></button></main>;
}
