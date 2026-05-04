export default function ChatBubble({ message, isMe }) {
  const content = message.type === 'deleted'
    ? 'This message was deleted'
    : message.type === 'aiSummary'
      ? `AI Summary: ${message.text}`
      : message.text;

  return <div className={`bubble ${isMe ? 'me' : ''}`}><p>{content}</p><small>{message.time} {isMe ? '??' : ''} {message.reaction || ''}</small>{message.type === 'translated' && <div className="tiny-link">Translate</div>}</div>;
}
