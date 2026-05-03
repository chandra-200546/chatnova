import { useEffect, useState } from 'react';
import { useApp } from '../state/AppContext';

export default function ThemeScreen() {
  const { settings, updateSettings } = useApp();
  const colors = ['#4F46E5', '#06B6D4', '#22C55E', '#F59E0B'];
  const [accent, setAccent] = useState(settings?.accent_color || '#4F46E5');
  const [error, setError] = useState('');

  useEffect(() => {
    if (settings?.accent_color) setAccent(settings.accent_color);
  }, [settings?.accent_color]);

  const saveAccent = async (c) => {
    setAccent(c);
    setError('');
    try {
      await updateSettings({ accent_color: c });
    } catch (e) {
      setError(e.message || 'Failed to save accent');
    }
  };

  return <main className="screen-page"><h2>Theme</h2><div className="settings-item"><span>Dark mode</span><span>Enabled</span></div><div className="settings-item"><span>Light mode</span><span>Placeholder</span></div><div className="settings-item"><span>System default</span><span>Off</span></div><h3>Accent Color</h3><div className="chips">{colors.map((c)=><button key={c} className="swatch" style={{background:c, outline: accent===c ? '2px solid #fff' : 'none'}} onClick={()=>saveAccent(c)} />)}</div>{error && <small className="danger">{error}</small>}<div className="settings-item"><span>Chat wallpaper</span><span>Aurora (mock)</span></div></main>;
}
