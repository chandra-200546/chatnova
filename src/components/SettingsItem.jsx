export default function SettingsItem({ label, right, onClick }) { return <button className="settings-item" onClick={onClick}><span>{label}</span><span>{right}</span></button>; }
