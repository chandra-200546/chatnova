export default function ChatBubble({ message, isMe }) {
  return <div className={`bubble ${isMe ? 'me' : ''}`}><p>{message.type === 'deleted' ? 'This message was deleted' : message.text}</p><small>{message.time} {isMe ? '??' : ''} {message.reaction || ''}</small>{message.type === 'translated' && <div className="tiny-link">Translate</div>}</div>;
}
