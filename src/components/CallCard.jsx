import Avatar from './Avatar';
export default function CallCard({ item }) { return <div className="list-card"><Avatar name={item.name} /><div className="grow"><h4>{item.name}</h4><p className={item.direction==='missed'?'danger':''}>{item.direction} • {item.time}</p></div><div>{item.type==='video'?'??':'??'}</div></div>; }
