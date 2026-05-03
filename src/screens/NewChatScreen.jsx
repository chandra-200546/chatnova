import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';
import { useApp } from '../state/AppContext';

export default function NewChatScreen() {
  const nav = useNavigate();
  const { contacts, createDirectChat } = useApp();
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())), [contacts, search]);
  return <main className="screen-page"><h2>New Chat</h2><SearchBar value={search} onChange={setSearch} placeholder="Search contacts" /><div className="chips"><button>New Group</button><button>New Broadcast</button><button>Invite Friend</button></div>{filtered.length === 0 ? <EmptyState title="No contacts found" description="Invite friends or create profiles to start chatting." /> : filtered.map((c)=><button className="list-card" key={c.id} onClick={async()=>{ const chatId = await createDirectChat(c.id); nav(`/chat/${chatId}`); }}><Avatar name={c.name} isOnline={c.isOnline} /><div><h4>{c.name}</h4><p>{c.bio}</p></div></button>)}</main>;
}
