import { useState } from 'react';

export default function ThemeScreen() {
  const [accent, setAccent] = useState('#4F46E5'); const colors=['#4F46E5','#06B6D4','#22C55E','#F59E0B'];
  return <main className="screen-page"><h2>Theme</h2><div className="settings-item"><span>Dark mode</span><span>Enabled</span></div><div className="settings-item"><span>Light mode</span><span>Placeholder</span></div><div className="settings-item"><span>System default</span><span>Off</span></div><h3>Accent Color</h3><div className="chips">{colors.map((c)=><button key={c} className="swatch" style={{background:c, outline: accent===c ? '2px solid #fff' : 'none'}} onClick={()=>setAccent(c)} />)}</div><div className="settings-item"><span>Chat wallpaper</span><span>Aurora (mock)</span></div></main>;
}
