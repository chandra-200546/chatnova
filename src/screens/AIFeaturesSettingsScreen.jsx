import { useApp } from '../state/AppContext';

export default function AIFeaturesSettingsScreen() {
  const { settings, updateSettings } = useApp();
  const t = async (key) => updateSettings({ [key]: !settings?.[key] });
  return <main className="screen-page"><h2>AI Features</h2><button className="settings-item" onClick={()=>t('smart_replies')}><span>Smart replies</span><span>{settings?.smart_replies?'ON':'OFF'}</span></button><button className="settings-item" onClick={()=>t('auto_translation')}><span>Auto translation</span><span>{settings?.auto_translation?'ON':'OFF'}</span></button><button className="settings-item" onClick={()=>t('spam_detection')}><span>Spam detection</span><span>{settings?.spam_detection?'ON':'OFF'}</span></button><button className="settings-item" onClick={()=>t('chat_summary')}><span>Chat summary</span><span>{settings?.chat_summary?'ON':'OFF'}</span></button></main>;
}
