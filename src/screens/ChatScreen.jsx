import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';
import MessageInput from '../components/MessageInput';
import { useApp } from '../state/AppContext';

export default function ChatScreen() {
  const { chatId } = useParams();
  const nav = useNavigate();
  const { chatList, messagesByChat, sendMessage, fetchMessages, user, createCall, logAiAction } = useApp();
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const chat = useMemo(() => chatList.find((c) => c.id === chatId) || null, [chatId, chatList]);
  const msgs = messagesByChat[chatId] || [];

  useEffect(() => {
    if (chatId) fetchMessages(chatId);
  }, [chatId]);

  const onStartCall = async (type) => {
    if (!chatId) return;
    setError('');
    setInfo('');
    try {
      await createCall(type, chatId);
      setInfo(`${type === 'video' ? 'Video' : 'Audio'} call started (mock log created).`);
    } catch (e) {
      setError(e.message || 'Failed to start call');
    }
  };

  const onAiSummary = async () => {
    if (!chatId) return;
    setError('');
    setInfo('');
    try {
      const source = msgs.slice(-5).map((m) => m.text).filter(Boolean).join(' | ');
      const summary = source
        ? `Recent chat: ${source.slice(0, 160)}${source.length > 160 ? '...' : ''}`
        : 'No messages to summarize yet. Start chatting and try again.';
      await sendMessage(chatId, summary, 'aiSummary');
      await logAiAction('chat_summary', source || 'no source', summary);
      setInfo('AI summary added to this chat.');
    } catch (e) {
      setError(e.message || 'Failed to create summary');
    }
  };

  return (
    <main className="screen-page">
      <div className="chat-head">
        <Link to="/">Back</Link>
        <strong>{chat?.name || 'Chat'}</strong>
        <small>online - typing...</small>
        <button onClick={onAiSummary}>AI</button>
        <button onClick={() => onStartCall('audio')}>Call</button>
        <button onClick={() => onStartCall('video')}>Video</button>
        <button onClick={() => nav('/user-profile')}>More</button>
      </div>
      <div className="pinned">Pinned: Sprint checklist and tasks</div>
      <div className="msg-list">
        <div className="date">Today</div>
        {msgs.map((m) => <ChatBubble key={m.id} message={m} isMe={m.senderId === user?.id} />)}
      </div>
      <div className="chips">
        <button>Okay bro</button><button>I'll check</button><button>Send details</button><button>Call me</button>
      </div>
      {info && <small className="note">{info}</small>}
      {error && <small className="danger">{error}</small>}
      <MessageInput
        text={text}
        setText={setText}
        onSend={async () => {
          if (!text.trim() || !chatId) return;
          try {
            await sendMessage(chatId, text.trim());
            setText('');
            setError('');
          } catch (e) {
            setError(e.message || 'Failed to send');
          }
        }}
      />
    </main>
  );
}
