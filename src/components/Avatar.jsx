import { initials } from '../utils/helpers';

export default function Avatar({ name, isOnline }) {
  return <div className="avatar">{initials(name)}{isOnline && <span className="online" />}</div>;
}
