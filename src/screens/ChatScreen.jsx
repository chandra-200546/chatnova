import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';
import MessageInput from '../components/MessageInput';
import { useApp } from '../state/AppContext';

export default function ChatScreen() {
  const { chatId } = useParams();
  const nav = useNavigate();
  const { chatList, messagesByChat, sendMessage, fetchMessages, user } = useApp();
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const chat = useMemo(() => chatList.find((c) => c.id === chatId) || null, [chatId, chatList]);
  const msgs = messagesByChat[chatId] || [];

  useEffect(() => {
    if (chatId) fetchMessages(chatId);
  }, [chatId]);

  return (
    <main className="screen-page">
      <div className="chat-head">
        <Link to="/">Back</Link>
        <strong>{chat?.name || 'Chat'}</strong>
        <small>online - typing...</small>
        <button>AI</button>
        <button>Call</button>
        <button>Video</button>
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
