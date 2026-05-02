export const validatePhone = (v) => /\d{10,}/.test((v || '').replace(/\D/g, ''));
export const validateOtp = (v) => /^\d{6}$/.test(v || '');
