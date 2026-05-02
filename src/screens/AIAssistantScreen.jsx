import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import AIActionCard from '../components/AIActionCard';
import { AI_ACTIONS } from '../constants/appConfig';
import { aiService } from '../services/aiService';

export default function AIAssistantScreen() {
  const [input,setInput] = useState(''); const [out,setOut] = useState('');
  return <main className="screen-page"><AppHeader title="AI Assistant" subtitle="Your smart messaging companion" />{AI_ACTIONS.map((t,i)=><AIActionCard key={t} title={t} description="Boost messaging productivity" badge={i>5?'Coming soon':''} onPress={()=>setOut(`Selected: ${t}`)} />)}<div className="composer"><input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask AI" /><button onClick={async()=>setOut((await aiService.ask(input)).text)}>Send</button></div>{out && <p className="note">{out}</p>}</main>;
}
