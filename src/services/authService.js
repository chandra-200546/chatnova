import { supabase } from '../lib/supabaseClient';

export const authService = {
  requestOtp: async (phone) => {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) throw error;
    return { ok: true };
  },
  verifyOtp: async (phone, otp) => {
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
    if (error) throw error;
    return { ok: true };
  },
  signOut: async () => supabase.auth.signOut(),
};
