import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../state/AppContext';

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export default function CallSessionScreen() {
  const { chatId, type } = useParams();
  const nav = useNavigate();
  const { chatList, createCall } = useApp();
  const [status, setStatus] = useState('Ringing...');
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  const chat = useMemo(() => chatList.find((c) => c.id === chatId), [chatId, chatList]);

  useEffect(() => {
    let alive = true;
    createCall(type === 'video' ? 'video' : 'audio', chatId).catch(() => {});
    const t1 = setTimeout(() => {
      if (alive) setStatus('Connected');
    }, 1400);
    const t2 = setInterval(() => {
      if (alive) setSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      alive = false;
      clearTimeout(t1);
      clearInterval(t2);
    };
  }, [chatId, type, createCall]);

  return (
    <main className="center-screen">
      <h2>{type === 'video' ? 'Video Call' : 'Voice Call'}</h2>
      <h3>{chat?.name || 'Contact'}</h3>
      <p>{status} {status === 'Connected' ? `• ${formatDuration(seconds)}` : ''}</p>
      <div className="chips">
        <button className={isMuted ? 'tab-btn active' : 'tab-btn'} onClick={() => setIsMuted((v) => !v)}>{isMuted ? 'Unmute' : 'Mute'}</button>
        <button className={isSpeaker ? 'tab-btn active' : 'tab-btn'} onClick={() => setIsSpeaker((v) => !v)}>{isSpeaker ? 'Earpiece' : 'Speaker'}</button>
        {type === 'video' && <button className="tab-btn">Camera Flip</button>}
      </div>
      <button className="danger-btn" onClick={() => nav(`/chat/${chatId}`)}>End Call</button>
    </main>
  );
}
