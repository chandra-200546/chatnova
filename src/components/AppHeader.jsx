export default function AppHeader({ title, subtitle, right }) {
  return <div className="header"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><div className="header-actions">{right}</div></div>;
}
