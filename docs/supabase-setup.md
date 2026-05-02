# Supabase Backend Setup (ChatNova)

## 1. Add environment variables
Create `.env` from `.env.example`.

## 2. Install client package
```bash
npm install @supabase/supabase-js
```

## 3. Apply schema
Open Supabase SQL Editor and run in this order:
1. `supabase/schema.sql`
2. `supabase/storage.sql`
3. `supabase/rpc.sql`

## 4. Enable Realtime
In Supabase dashboard -> Database -> Replication:
- enable realtime for `messages`
- enable realtime for `chat_members`
- optionally `status_updates`

## 5. Auth configuration
Use Supabase Auth with Phone OTP.
Set your SMS provider in Supabase Auth settings.

## 6. Security notes
- Keep service role key server-side only.
- Never expose service role key in frontend.
- Rotate any key that was shared in chat.

## 7. Suggested next integration order
1. Replace login/OTP with `supabase.auth.signInWithOtp()`
2. Replace profile setup with insert/update into `profiles`
3. Replace chat list query with `chats` + `chat_members`
4. Replace message send/read with `messages`
5. Add realtime subscriptions for `messages`
