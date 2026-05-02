import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import SearchBar from '../components/SearchBar';
import TabButton from '../components/TabButton';
import ChatCard from '../components/ChatCard';
import FloatingButton from '../components/FloatingButton';
import EmptyState from '../components/EmptyState';
import { CHAT_FOLDERS } from '../constants/appConfig';
import { useApp } from '../state/AppContext';

export default function HomeScreen() {
  const nav = useNavigate();
  const { chatList } = useApp();
  const [search, setSearch] = useState('');
  const [folder, setFolder] = useState('All');

  const rows = useMemo(
    () => chatList.filter((x) =>
      (folder === 'All' || x.folder === folder || (folder === 'Unread' && x.unreadCount > 0)) &&
      x.name.toLowerCase().includes(search.toLowerCase())
    ),
    [chatList, search, folder]
  );

  return (
    <main className="screen-page">
      <AppHeader
        title="ChatNova"
        right={<><button>Search</button><button>Camera</button><button onClick={() => nav('/settings')}>More</button></>}
      />
      <SearchBar value={search} onChange={setSearch} placeholder="Search chats" />
      <div className="chips">{CHAT_FOLDERS.map((f) => <TabButton key={f} label={f} active={folder === f} onClick={() => setFolder(f)} />)}</div>
      {rows.length === 0 ? <EmptyState title="No chats yet" description="Start a new conversation from the + button." /> : rows.map((item) => <ChatCard key={item.id} {...item} onPress={() => nav(`/chat/${item.id}`)} />)}
      <FloatingButton icon="+" onClick={() => nav('/new-chat')} />
    </main>
  );
}
