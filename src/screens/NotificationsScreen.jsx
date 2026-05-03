import { useState } from 'react';

export default function NotificationsScreen() {
  const [push, setPush] = useState(localStorage.getItem('cn_push') !== '0');
  const [sound, setSound] = useState(localStorage.getItem('cn_sound') !== '0');
  return <main className="screen-page"><h2>Notifications</h2><button className="settings-item" onClick={()=>{ const v=!push; setPush(v); localStorage.setItem('cn_push', v ? '1' : '0'); }}><span>Push notifications</span><span>{push?'ON':'OFF'}</span></button><button className="settings-item" onClick={()=>{ const v=!sound; setSound(v); localStorage.setItem('cn_sound', v ? '1' : '0'); }}><span>Notification sounds</span><span>{sound?'ON':'OFF'}</span></button></main>;
}
