import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import StatusCircle from '../components/StatusCircle';
import EmptyState from '../components/EmptyState';
import { useApp } from '../state/AppContext';

export default function StatusScreen() {
  const { statuses, profile, createStatus } = useApp();
  const [error, setError] = useState('');

  const onAddStatus = async () => {
    setError('');
    try {
      const text = window.prompt('Type your status');
      if (text === null) return;
      await createStatus(text || 'New status update');
    } catch (e) {
      setError(e.message || 'Failed to create status');
    }
  };

  return <main className="screen-page"><AppHeader title="Status" /><div className="list-card"><div className="avatar">{(profile?.display_name || 'ME').slice(0,2).toUpperCase()}</div><div className="grow"><h4>My Status</h4><p>Tap to add status</p></div><button onClick={onAddStatus}>+</button></div>{error && <small className="danger">{error}</small>}{statuses.length === 0 ? <EmptyState title="No status updates" description="Post a status and your contacts can view it." /> : <div className="horizontal">{statuses.map((s)=><StatusCircle key={s.id} name={s.name} viewed={s.viewed} />)}</div>}<button className="ai-card">AI Status Caption Generator</button></main>;
}
