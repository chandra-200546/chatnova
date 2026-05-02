export default function TabButton({ active, label, onClick }) { return <button className={`tab-btn ${active?'active':''}`} onClick={onClick}>{label}</button>; }
