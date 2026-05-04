export function toReadableError(error) {
  const raw = error?.message || 'Unknown error';
  const text = String(raw);
  const lower = text.toLowerCase();

  if (lower.includes('failed to fetch') || lower.includes('networkerror')) {
    return 'Network error: check internet, Supabase URL, and Auth Site URL/Redirect URL settings.';
  }
  if (lower.includes('invalid login credentials')) {
    return 'Invalid credentials. Check email/phone and password.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Email not confirmed. Verify your email, then login.';
  }
  if (lower.includes('sms') && lower.includes('provider')) {
    return 'SMS provider is not configured correctly in Supabase Auth.';
  }

  return text;
}
