import { initials } from '../utils/helpers';

export default function Avatar({ name, isOnline, imageUrl }) {
  return <div className="avatar">{imageUrl ? <img src={imageUrl} alt={name || 'avatar'} className="avatar-img" /> : initials(name)}{isOnline && <span className="online" />}</div>;
}
