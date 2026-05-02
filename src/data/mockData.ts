import { CallItem, Chat, Group, Message, StatusItem, User } from '../types';

export const contacts: User[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `u${i + 1}`,
  name: ['Aarav', 'Mia', 'Rohit', 'Sophia', 'Kabir', 'Nina', 'Arjun', 'Zara', 'Ishan', 'Emma'][i],
  phone: `+91 98765012${i}${i}`,
  bio: ['Shipping sprint', 'On a call', 'Gym time', 'Coffee break', 'Designing', 'At work', 'Weekend mode', 'Traveling', 'Reading', 'Online'][i],
  isOnline: i % 2 === 0,
}));

export const chats: Chat[] = [
  { id: 'c1', name: 'Aarav', lastMessage: 'Let us lock the release plan.', time: '9:21 PM', unreadCount: 2, isOnline: true, folder: 'Work' },
  { id: 'c2', name: 'Family', lastMessage: 'Dinner at 8?', time: '8:45 PM', unreadCount: 0, isPinned: true, folder: 'Family' },
  { id: 'c3', name: 'Mia', lastMessage: 'Mood status idea: "Focus mode"', time: '7:10 PM', unreadCount: 5, folder: 'Personal' },
  { id: 'c4', name: 'Biz Client', lastMessage: 'Invoice approved.', time: '6:02 PM', unreadCount: 1, isMuted: true, folder: 'Business' },
  { id: 'c5', name: 'ChatNova AI', lastMessage: 'I can summarize this thread.', time: '5:32 PM', unreadCount: 0, folder: 'AI' },
  { id: 'c6', name: 'Rohit', lastMessage: 'Let us play at 10.', time: '4:40 PM', unreadCount: 0, folder: 'Personal' },
  { id: 'c7', name: 'Dev Team', lastMessage: 'PR merged.', time: '3:12 PM', unreadCount: 3, folder: 'Work' },
  { id: 'c8', name: 'College Group', lastMessage: 'Poll: trip this month?', time: '2:06 PM', unreadCount: 0, folder: 'All' },
  { id: 'c9', name: 'Nina', lastMessage: 'Send me docs please.', time: '1:31 PM', unreadCount: 1, folder: 'Work' },
  { id: 'c10', name: 'Zara', lastMessage: 'Voice note sent', time: '11:19 AM', unreadCount: 0, folder: 'Personal' },
];

export const groups: Group[] = [
  { id: 'g1', name: 'College Group', lastMessage: 'Meet at auditorium.', memberCount: 56, unreadCount: 6, lastActive: 'Now', isAdmin: false },
  { id: 'g2', name: 'Family Circle', lastMessage: 'Festival plans shared.', memberCount: 12, unreadCount: 0, lastActive: '10m ago', isAdmin: true },
  { id: 'g3', name: 'Work Command', lastMessage: 'Standup starts in 5.', memberCount: 19, unreadCount: 3, lastActive: '2m ago', isAdmin: true },
  { id: 'g4', name: 'Announcements', lastMessage: 'Office closed Friday.', memberCount: 203, unreadCount: 1, lastActive: '1h ago', isAdmin: false },
  { id: 'g5', name: 'Startup Founders', lastMessage: 'Pitch deck feedback?', memberCount: 9, unreadCount: 2, lastActive: '3h ago', isAdmin: false },
];

export const statuses: StatusItem[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `s${i + 1}`,
  name: contacts[i].name,
  type: (['image', 'text', 'video'] as const)[i % 3],
  viewed: i > 3,
  time: `${i + 1}h ago`,
}));

export const calls: CallItem[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `call${i + 1}`,
  name: contacts[i].name,
  type: i % 2 === 0 ? 'audio' : 'video',
  direction: (['incoming', 'outgoing', 'missed'] as const)[i % 3],
  time: `${i + 2}:1${i} PM`,
}));

export const messagesByChat: Record<string, Message[]> = {
  c1: [
    { id: 'm1', chatId: 'c1', senderId: 'u1', text: 'Sprint update ready?', type: 'text', time: '9:02 PM', status: 'read' },
    { id: 'm2', chatId: 'c1', senderId: 'me', text: 'Yes, sharing in 10 mins.', type: 'reply', time: '9:06 PM', status: 'read', reaction: '??' },
    { id: 'm3', chatId: 'c1', senderId: 'u1', text: 'Resumen: tarea completa', type: 'translated', time: '9:09 PM', status: 'delivered' },
    { id: 'm4', chatId: 'c1', senderId: 'u1', text: 'Voice note', type: 'voice', time: '9:10 PM' },
    { id: 'm5', chatId: 'c1', senderId: 'me', text: 'Image attachment', type: 'image', time: '9:12 PM', status: 'delivered' },
    { id: 'm6', chatId: 'c1', senderId: 'u1', text: 'This message was deleted', type: 'deleted', time: '9:14 PM' },
    { id: 'm7', chatId: 'c1', senderId: 'u1', text: 'AI Summary: Action items extracted.', type: 'aiSummary', time: '9:15 PM' },
  ],
};
