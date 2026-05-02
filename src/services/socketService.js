import { supabase } from '../lib/supabaseClient';

export const socketService = {
  channel: null,
  connectMessages: (chatId, onInsert) => {
    if (socketService.channel) supabase.removeChannel(socketService.channel);
    socketService.channel = supabase
      .channel(`messages-${chatId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${chatId}` }, onInsert)
      .subscribe();
  },
  disconnect: () => {
    if (socketService.channel) supabase.removeChannel(socketService.channel);
    socketService.channel = null;
  },
};
