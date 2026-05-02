export default function MessageInput({ text, setText, onSend }) {
  return <form className="composer" onSubmit={(e)=>{e.preventDefault();onSend();}}><span>??</span><input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Type message" /><span>??</span><span>??</span><button type="submit">{text.trim() ? 'Send' : 'Mic'}</button></form>;
}
