export const authService = {
  requestOtp: async (_phone: string) => ({ success: true }),
  verifyOtp: async (_phone: string, otp: string) => ({ success: otp.length === 6 }),
};
