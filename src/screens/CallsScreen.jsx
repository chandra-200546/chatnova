import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import CallCard from '../components/CallCard';
import FloatingButton from '../components/FloatingButton';
import EmptyState from '../components/EmptyState';
import { useApp } from '../state/AppContext';

export default function CallsScreen() {
  const { calls, createCall } = useApp();
  const [error, setError] = useState('');

  const onNewCall = async () => {
    setError('');
    try {
      await createCall('audio');
    } catch (e) {
      setError(e.message || 'Failed to create call log');
    }
  };

  return <main className="screen-page"><AppHeader title="Calls" />{error && <small className="danger">{error}</small>}{calls.length === 0 ? <EmptyState title="No call logs" description="Your recent audio and video calls will appear here." /> : calls.map((c)=><CallCard key={c.id} item={c} />)}<FloatingButton icon="+" onClick={onNewCall} /></main>;
}
