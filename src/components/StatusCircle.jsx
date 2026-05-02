import Avatar from './Avatar';
export default function StatusCircle({ name, viewed }) { return <div className="status-circle"><div className={`ring ${viewed?'viewed':''}`}><Avatar name={name} /></div><small>{name}</small></div>; }
