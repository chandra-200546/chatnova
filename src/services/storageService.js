import { supabase } from '../lib/supabaseClient';

export const storageService = {
  uploadAvatar: async (file, userId) => {
    const path = `${userId}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('avatars').upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    return data.publicUrl;
  },
};
