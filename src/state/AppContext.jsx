import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { formatTime } from '../utils/formatTime';
import { storageService } from '../services/storageService';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [groups, setGroups] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [calls, setCalls] = useState([]);
  const [messagesByChat, setMessagesByChat] = useState({});
  const [loading, setLoading] = useState(true);
  const [bootError, setBootError] = useState('');

  const defaultSettings = {
    smart_replies: true,
    auto_translation: true,
    spam_detection: true,
    chat_summary: true,
    fingerprint_lock: false,
    private_vault: false,
    disappearing_messages: false,
    theme_mode: 'dark',
    accent_color: '#25D366',
  };

  const ensureSettingsRow = async (userId) => {
    const { data, error } = await supabase
      .from('user_settings')
      .upsert({ user_id: userId }, { onConflict: 'user_id' })
      .select('*')
      .single();
    if (error) throw error;
    return data;
  };

  const loadProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();
    setProfile(data || null);
    const { data: settingsRow } = await supabase.from('user_settings').select('*').eq('user_id', userId).maybeSingle();
    if (settingsRow) {
      setSettings(settingsRow);
    } else {
      const created = await ensureSettingsRow(userId);
      setSettings({ ...defaultSettings, ...created });
    }
  };

  const loadContacts = async (userId) => {
    const { data } = await supabase.from('profiles').select('id, display_name, phone, bio, is_online').neq('id', userId).order('display_name');
    setContacts((data || []).map((x) => ({ id: x.id, name: x.display_name, phone: x.phone, bio: x.bio || '', isOnline: x.is_online })));
  };

  const hydrateChats = async (userId) => {
    const { data: memberships } = await supabase
      .from('chat_members')
      .select('chat_id, unread_count, is_muted, is_pinned')
      .eq('user_id', userId);

    const chatIds = (memberships || []).map((x) => x.chat_id);
    if (!chatIds.length) {
      setChatList([]);
      setGroups([]);
      return;
    }

    const { data: chats } = await supabase
      .from('chats')
      .select('id, type, title, created_at, updated_at, is_announcement')
      .in('id', chatIds)
      .order('updated_at', { ascending: false });

    const { data: messages } = await supabase
      .from('messages')
      .select('chat_id, content, type, created_at')
      .in('chat_id', chatIds)
      .order('created_at', { ascending: false });

    const lastMessageMap = new Map();
    (messages || []).forEach((m) => {
      if (!lastMessageMap.has(m.chat_id)) {
        lastMessageMap.set(m.chat_id, m);
      }
    });

    const membershipMap = new Map((memberships || []).map((m) => [m.chat_id, m]));

    const mapped = (chats || []).map((c) => {
      const last = lastMessageMap.get(c.id);
      const member = membershipMap.get(c.id);
      return {
        id: c.id,
        name: c.title || (c.type === 'direct' ? 'Direct Chat' : 'Untitled'),
        lastMessage: last?.content || 'No messages yet',
        time: last?.created_at ? formatTime(new Date(last.created_at)) : formatTime(new Date(c.created_at)),
        unreadCount: member?.unread_count || 0,
        isMuted: member?.is_muted || false,
        isPinned: member?.is_pinned || false,
        folder: c.type === 'ai' ? 'AI' : c.type === 'business' ? 'Business' : c.type === 'group' ? 'Work' : 'Personal',
        isOnline: false,
        type: c.type,
      };
    });

    setChatList(mapped);
    setGroups(mapped.filter((x) => x.type === 'group').map((g) => ({
      id: g.id,
      name: g.name,
      lastMessage: g.lastMessage,
      memberCount: 0,
      unreadCount: g.unreadCount,
      lastActive: g.time,
      isAdmin: false,
    })));
  };

  const loadStatuses = async () => {
    const { data } = await supabase
      .from('status_updates')
      .select('id, type, created_at, profiles!status_updates_user_id_fkey(display_name)')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    setStatuses((data || []).map((s) => ({
      id: s.id,
      name: s.profiles?.display_name || 'User',
      type: s.type,
      viewed: false,
      time: formatTime(new Date(s.created_at)),
    })));
  };

  const loadCalls = async (userId) => {
    const { data } = await supabase
      .from('calls')
      .select('id, call_type, direction, started_at, caller_id, receiver_id, profiles!calls_caller_id_fkey(display_name)')
      .or(`caller_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('started_at', { ascending: false })
      .limit(30);

    setCalls((data || []).map((c) => ({
      id: c.id,
      name: c.profiles?.display_name || 'Call',
      type: c.call_type,
      direction: c.direction,
      time: formatTime(new Date(c.started_at)),
    })));
  };

  const refreshAll = async (userId) => {
    await Promise.allSettled([
      loadProfile(userId),
      loadContacts(userId),
      hydrateChats(userId),
      loadStatuses(),
      loadCalls(userId),
    ]);
  };

  useEffect(() => {
    let mounted = true;
    const safeBoot = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(data.session);
        setUser(data.session?.user || null);
        setLoading(false);
        if (data.session?.user?.id) {
          refreshAll(data.session.user.id).catch((e) => {
            if (mounted) setBootError(e?.message || 'Background sync failed');
          });
        }
      } catch (e) {
        setBootError(e?.message || 'Startup failed');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    safeBoot();

    const bootTimeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 8000);

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      try {
        setSession(nextSession);
        setUser(nextSession?.user || null);
        setLoading(false);
        if (nextSession?.user?.id) {
          refreshAll(nextSession.user.id).catch((e) => {
            if (mounted) setBootError(e?.message || 'Background sync failed');
          });
        } else {
          setProfile(null);
          setSettings(null);
          setChatList([]);
          setGroups([]);
          setContacts([]);
          setStatuses([]);
          setCalls([]);
          setMessagesByChat({});
        }
      } catch (e) {
        setBootError(e?.message || 'Session update failed');
      } finally {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(bootTimeout);
      sub.subscription.unsubscribe();
    };
  }, []);

  const requestOtp = async (phone) => {
    const normalized = phone.startsWith('+') ? phone : `+${phone}`;
    const { error } = await supabase.auth.signInWithOtp({ phone: normalized });
    if (error) throw error;
  };

  const signUpWithPassword = async ({ email, phone, password, displayName }) => {
    const payload = { password, options: { data: { display_name: displayName || 'New User' } } };
    if (email) payload.email = email;
    if (phone) payload.phone = phone;
    const { data, error } = await supabase.auth.signUp(payload);
    if (error) throw error;
    return data;
  };

  const signInWithPassword = async ({ emailOrPhone, password }) => {
    const id = (emailOrPhone || '').trim();
    const payload = id.includes('@') ? { email: id, password } : { phone: id.startsWith('+') ? id : `+${id}`, password };
    const { data, error } = await supabase.auth.signInWithPassword(payload);
    if (error) throw error;
    return data;
  };

  const verifyOtp = async (phone, otp) => {
    const normalized = phone.startsWith('+') ? phone : `+${phone}`;
    const { error } = await supabase.auth.verifyOtp({ phone: normalized, token: otp, type: 'sms' });
    if (error) throw error;
  };

  const completeProfile = async ({ name, bio, phone, avatarUrl }) => {
    if (!user?.id) return;
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: name, bio: bio || '', phone, ...(avatarUrl ? { avatar_url: avatarUrl } : {}) })
      .eq('id', user.id);
    if (error) throw error;
    await loadProfile(user.id);
  };

  const updateProfile = async (patch) => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from('profiles')
      .update(patch)
      .eq('id', user.id)
      .select('*')
      .single();
    if (error) throw error;
    setProfile(data);
    return data;
  };

  const uploadAvatar = async (file) => {
    if (!user?.id) return null;
    const url = await storageService.uploadAvatar(file, user.id);
    await updateProfile({ avatar_url: url });
    return url;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const fetchMessages = async (chatId) => {
    const { data } = await supabase
      .from('messages')
      .select('id, sender_id, content, type, created_at, status')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    setMessagesByChat((prev) => ({
      ...prev,
      [chatId]: (data || []).map((m) => ({
        id: m.id,
        senderId: m.sender_id,
        text: m.content || '',
        type: m.type,
        time: formatTime(new Date(m.created_at)),
        status: m.status,
      })),
    }));
  };

  const sendMessage = async (chatId, text, type = 'text') => {
    if (!user?.id) return;
    const { error } = await supabase.from('messages').insert({
      chat_id: chatId,
      sender_id: user.id,
      type,
      content: text,
      status: 'sent',
    });
    if (error) throw error;
    await fetchMessages(chatId);
    await hydrateChats(user.id);
  };

  const createDirectChat = async (otherUserId) => {
    const { data, error } = await supabase.rpc('create_direct_chat', { other_user: otherUserId });
    if (error) throw error;
    await hydrateChats(user.id);
    return data;
  };

  const updateSettings = async (patch) => {
    if (!user?.id) return;
    await ensureSettingsRow(user.id);
    const { data, error } = await supabase
      .from('user_settings')
      .update(patch)
      .eq('user_id', user.id)
      .select('*')
      .single();
    if (error) throw error;
    setSettings({ ...defaultSettings, ...data });
  };

  const createGroup = async (title) => {
    if (!user?.id) return null;
    const { data: chat, error: chatErr } = await supabase
      .from('chats')
      .insert({ type: 'group', title, created_by: user.id })
      .select('id')
      .single();
    if (chatErr) throw chatErr;
    const { error: memberErr } = await supabase
      .from('chat_members')
      .insert({ chat_id: chat.id, user_id: user.id, role: 'owner' });
    if (memberErr) throw memberErr;
    await hydrateChats(user.id);
    return chat.id;
  };

  const createStatus = async (content) => {
    if (!user?.id) return;
    const { error } = await supabase.from('status_updates').insert({
      user_id: user.id,
      type: 'text',
      content: content || 'New status',
      mood: profile?.mood_status || 'Good',
    });
    if (error) throw error;
    await loadStatuses();
  };

  const createCall = async (type = 'audio') => {
    if (!user?.id) return;
    const { error } = await supabase.from('calls').insert({
      caller_id: user.id,
      call_type: type,
      direction: 'outgoing',
    });
    if (error) throw error;
    await loadCalls(user.id);
  };

  const logAiAction = async (action, inputText, outputText) => {
    if (!user?.id) return;
    await supabase.from('ai_logs').insert({
      user_id: user.id,
      action,
      input_text: inputText || null,
      output_text: outputText || null,
    });
  };

  const value = useMemo(() => ({
    loading,
    bootError,
    session,
    user,
    profile,
    settings,
    isAuthenticated: !!user,
    hasProfile: !!profile?.display_name,
    contacts,
    chatList,
    groups,
    statuses,
    calls,
    messagesByChat,
    requestOtp,
    verifyOtp,
    signUpWithPassword,
    signInWithPassword,
    completeProfile,
    updateProfile,
    uploadAvatar,
    logout,
    fetchMessages,
    sendMessage,
    createDirectChat,
    updateSettings,
    createGroup,
    createStatus,
    createCall,
    logAiAction,
    refreshAll,
  }), [loading, session, user, profile, settings, contacts, chatList, groups, statuses, calls, messagesByChat]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
