export type MessageType =
  | 'text'
  | 'image'
  | 'voice'
  | 'deleted'
  | 'system'
  | 'reply'
  | 'translated'
  | 'aiSummary';

export interface User {
  id: string;
  name: string;
  phone: string;
  bio: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  type: MessageType;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  reaction?: string;
  replyTo?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline?: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
  folder: 'All' | 'Unread' | 'Personal' | 'Work' | 'Family' | 'Business' | 'AI';
}

export interface Group {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  memberCount: number;
  unreadCount: number;
  lastActive: string;
  isAdmin: boolean;
}

export interface StatusItem {
  id: string;
  name: string;
  avatar?: string;
  type: 'image' | 'text' | 'video';
  viewed: boolean;
  time: string;
}

export interface CallItem {
  id: string;
  name: string;
  avatar?: string;
  type: 'audio' | 'video';
  direction: 'incoming' | 'outgoing' | 'missed';
  time: string;
}
