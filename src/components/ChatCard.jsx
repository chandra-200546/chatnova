import Avatar from './Avatar';

export default function ChatCard({ name, lastMessage, time, unreadCount, isOnline, isPinned, isMuted, onPress }) {
  return <button className="list-card" onClick={onPress}><Avatar name={name} isOnline={isOnline} /><div className="grow"><h4>{name}</h4><p>{lastMessage}</p></div><div className="meta"><small>{time}</small>{unreadCount>0 && <span className="badge">{unreadCount}</span>}<small>{isPinned?'PIN':''} {isMuted?'MUTE':''}</small></div></button>;
}
