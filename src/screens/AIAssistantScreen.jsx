import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import AIActionCard from '../components/AIActionCard';
import { AI_ACTIONS } from '../constants/appConfig';
import { aiService } from '../services/aiService';
import { useApp } from '../state/AppContext';

export default function AIAssistantScreen() {
  const { logAiAction } = useApp();
  const [input, setInput] = useState('');
  const [out, setOut] = useState('');
  const [error, setError] = useState('');

  const sendAi = async () => {
    setError('');
    try {
      const text = (await aiService.ask(input)).text;
      setOut(text);
      await logAiAction('chat_assistant', input, text);
    } catch (e) {
      setError(e.message || 'AI request failed');
    }
  };

  return <main className="screen-page"><AppHeader title="AI Assistant" subtitle="Your smart messaging companion" />{AI_ACTIONS.map((t,i)=><AIActionCard key={t} title={t} description="Boost messaging productivity" badge={i>5?'Coming soon':''} onPress={async()=>{ setOut(`Selected: ${t}`); await logAiAction('feature_select', t, `Selected: ${t}`); }} />)}<div className="composer"><input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask AI" /><button onClick={sendAi}>Send</button></div>{error && <small className="danger">{error}</small>}{out && <p className="note">{out}</p>}</main>;
}
