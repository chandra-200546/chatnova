import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { calls, chats, contacts, groups, messagesByChat, statuses } from '../data/mockData';
import { CallItem, Chat, Group, Message, StatusItem, User } from '../types';

interface SettingsState {
  smartReplies: boolean;
  autoTranslation: boolean;
  spamDetection: boolean;
  chatSummary: boolean;
  fingerprintLock: boolean;
  privateVault: boolean;
  disappearingMessages: boolean;
}

interface AppState {
  isAuthenticated: boolean;
  currentUser?: User;
  chats: Chat[];
  groups: Group[];
  statuses: StatusItem[];
  calls: CallItem[];
  contacts: User[];
  messagesByChat: Record<string, Message[]>;
  settings: SettingsState;
  loginWithPhone: (phone: string) => void;
  completeProfile: (name: string, bio: string) => Promise<void>;
  restoreSession: () => Promise<boolean>;
  logout: () => Promise<void>;
  sendMessage: (chatId: string, text: string) => void;
  setToggle: (key: keyof SettingsState, value: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);
const USER_KEY = 'chatnova_user';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [chatList, setChatList] = useState<Chat[]>(chats);
  const [messageMap, setMessageMap] = useState<Record<string, Message[]>>(messagesByChat);
  const [tempPhone, setTempPhone] = useState('');
  const [settings, setSettings] = useState<SettingsState>({
    smartReplies: true,
    autoTranslation: true,
    spamDetection: true,
    chatSummary: true,
    fingerprintLock: false,
    privateVault: false,
    disappearingMessages: false,
  });

  const restoreSession = async () => {
    const raw = await AsyncStorage.getItem(USER_KEY);
    if (raw) {
      setCurrentUser(JSON.parse(raw));
      setAuthenticated(true);
      return true;
    }
    return false;
  };

  const loginWithPhone = (phone: string) => setTempPhone(phone);

  const completeProfile = async (name: string, bio: string) => {
    const user: User = { id: 'me', name, bio, phone: tempPhone || '+91 9999999999' };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    setCurrentUser(user);
    setAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(USER_KEY);
    setAuthenticated(false);
    setCurrentUser(undefined);
  };

  const sendMessage = (chatId: string, text: string) => {
    const msg: Message = {
      id: `${Date.now()}`,
      chatId,
      senderId: 'me',
      text,
      type: 'text',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
    };

    setMessageMap((prev) => ({ ...prev, [chatId]: [...(prev[chatId] || []), msg] }));
    setChatList((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, lastMessage: text, time: msg.time } : c))
    );
  };

  const setToggle = (key: keyof SettingsState, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      currentUser,
      chats: chatList,
      groups,
      statuses,
      calls,
      contacts,
      messagesByChat: messageMap,
      settings,
      loginWithPhone,
      completeProfile,
      restoreSession,
      logout,
      sendMessage,
      setToggle,
    }),
    [isAuthenticated, currentUser, chatList, messageMap, settings]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
