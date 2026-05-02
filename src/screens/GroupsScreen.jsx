import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import Avatar from '../components/Avatar';
import FloatingButton from '../components/FloatingButton';
import EmptyState from '../components/EmptyState';
import { useApp } from '../state/AppContext';

export default function GroupsScreen() {
  const nav = useNavigate();
  const { groups } = useApp();
  return <main className="screen-page"><AppHeader title="Groups" />{groups.length === 0 ? <EmptyState title="No groups yet" description="Create a group to start group conversations." /> : groups.map((g)=><button key={g.id} className="list-card" onClick={()=>nav(`/chat/${g.id}`)}><Avatar name={g.name} /><div className="grow"><h4>{g.name}</h4><p>{g.lastMessage}</p><small>{g.memberCount} members - {g.lastActive}</small></div><div>{g.isAdmin && <span className="chip">Admin</span>} {g.unreadCount>0 && <span className="badge">{g.unreadCount}</span>}</div></button>)}<FloatingButton icon="+" onClick={()=>{}} /></main>;
}
