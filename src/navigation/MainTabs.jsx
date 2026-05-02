import { Link, useLocation } from 'react-router-dom';

const tabs = [
  ['/', '💬 Chats'], ['/groups', '👥 Groups'], ['/status', '⭕ Status'], ['/calls', '📞 Calls'], ['/ai', '✨ AI']
];

export default function MainTabs() {
  const { pathname } = useLocation();
  return <div className="tabs">{tabs.map(([to, label]) => <Link key={to} to={to} className={pathname===to?'tab-active':''}>{label}</Link>)}</div>;
}
