-- ChatNova Supabase initial schema
-- Run in Supabase SQL editor

create extension if not exists "pgcrypto";

create type public.chat_type as enum ('direct', 'group', 'business', 'ai');
create type public.member_role as enum ('owner', 'admin', 'member');
create type public.message_type as enum ('text', 'image', 'voice', 'deleted', 'system', 'reply', 'translated', 'aiSummary');
create type public.message_status as enum ('sent', 'delivered', 'read');
create type public.call_type as enum ('audio', 'video');
create type public.call_direction as enum ('incoming', 'outgoing', 'missed');
create type public.status_type as enum ('image', 'text', 'video');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text unique,
  display_name text not null,
  username text unique,
  bio text default '',
  avatar_url text,
  mood_status text,
  business_mode boolean not null default false,
  is_online boolean not null default false,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_settings (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  smart_replies boolean not null default true,
  auto_translation boolean not null default true,
  spam_detection boolean not null default true,
  chat_summary boolean not null default true,
  fingerprint_lock boolean not null default false,
  private_vault boolean not null default false,
  disappearing_messages boolean not null default false,
  theme_mode text not null default 'dark',
  accent_color text not null default '#25D366',
  chat_wallpaper text,
  updated_at timestamptz not null default now()
);

create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  type public.chat_type not null,
  title text,
  description text,
  avatar_url text,
  created_by uuid references public.profiles(id) on delete set null,
  is_announcement boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_members (
  chat_id uuid not null references public.chats(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.member_role not null default 'member',
  is_muted boolean not null default false,
  is_pinned boolean not null default false,
  unread_count int not null default 0,
  joined_at timestamptz not null default now(),
  primary key (chat_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.chats(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete set null,
  reply_to_message_id uuid references public.messages(id) on delete set null,
  type public.message_type not null default 'text',
  content text,
  translated_content text,
  language_code text,
  media_url text,
  voice_duration_sec int,
  status public.message_status not null default 'sent',
  is_deleted boolean not null default false,
  ai_metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.message_reactions (
  message_id uuid not null references public.messages(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  reaction text not null,
  created_at timestamptz not null default now(),
  primary key (message_id, user_id)
);

create table if not exists public.message_tasks (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  created_by uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  is_done boolean not null default false,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.message_reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  message_id uuid not null references public.messages(id) on delete cascade,
  remind_at timestamptz not null,
  is_sent boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.calls (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid references public.chats(id) on delete set null,
  caller_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid references public.profiles(id) on delete cascade,
  call_type public.call_type not null,
  direction public.call_direction not null,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_sec int generated always as (greatest(0, coalesce(extract(epoch from (ended_at - started_at))::int, 0))) stored
);

create table if not exists public.status_updates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type public.status_type not null,
  content text,
  media_url text,
  mood text,
  expires_at timestamptz not null default (now() + interval '24 hour'),
  created_at timestamptz not null default now()
);

create table if not exists public.status_views (
  status_id uuid not null references public.status_updates(id) on delete cascade,
  viewer_id uuid not null references public.profiles(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  primary key (status_id, viewer_id)
);

create table if not exists public.ai_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  chat_id uuid references public.chats(id) on delete set null,
  action text not null,
  input_text text,
  output_text text,
  created_at timestamptz not null default now()
);

create table if not exists public.spam_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reported_user_id uuid references public.profiles(id) on delete set null,
  message_id uuid references public.messages(id) on delete set null,
  reason text,
  created_at timestamptz not null default now()
);

create table if not exists public.blocked_users (
  blocker_id uuid not null references public.profiles(id) on delete cascade,
  blocked_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id)
);

create index if not exists idx_chat_members_user on public.chat_members(user_id);
create index if not exists idx_messages_chat_created on public.messages(chat_id, created_at desc);
create index if not exists idx_messages_sender on public.messages(sender_id);
create index if not exists idx_calls_user_started on public.calls(caller_id, started_at desc);
create index if not exists idx_status_user_created on public.status_updates(user_id, created_at desc);
create index if not exists idx_message_reminders_user_when on public.message_reminders(user_id, remind_at);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger trg_chats_updated_at before update on public.chats for each row execute procedure public.set_updated_at();
create trigger trg_messages_updated_at before update on public.messages for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, phone, display_name)
  values (new.id, new.phone, coalesce(new.raw_user_meta_data->>'display_name', 'New User'))
  on conflict (id) do nothing;

  insert into public.user_settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.chats enable row level security;
alter table public.chat_members enable row level security;
alter table public.messages enable row level security;
alter table public.message_reactions enable row level security;
alter table public.message_tasks enable row level security;
alter table public.message_reminders enable row level security;
alter table public.calls enable row level security;
alter table public.status_updates enable row level security;
alter table public.status_views enable row level security;
alter table public.ai_logs enable row level security;
alter table public.spam_reports enable row level security;
alter table public.blocked_users enable row level security;

create policy "profiles_select_authenticated" on public.profiles for select to authenticated using (true);
create policy "profiles_update_self" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "settings_self_all" on public.user_settings for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "chat_member_can_select_chat" on public.chats for select to authenticated using (
  exists (select 1 from public.chat_members cm where cm.chat_id = chats.id and cm.user_id = auth.uid())
);
create policy "chat_creator_can_insert" on public.chats for insert to authenticated with check (auth.uid() = created_by);

create policy "member_can_select_members" on public.chat_members for select to authenticated using (
  exists (select 1 from public.chat_members cm where cm.chat_id = chat_members.chat_id and cm.user_id = auth.uid())
);
create policy "member_self_insert" on public.chat_members for insert to authenticated with check (auth.uid() = user_id);
create policy "member_self_update" on public.chat_members for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "member_can_read_messages" on public.messages for select to authenticated using (
  exists (select 1 from public.chat_members cm where cm.chat_id = messages.chat_id and cm.user_id = auth.uid())
);
create policy "member_can_send_messages" on public.messages for insert to authenticated with check (
  sender_id = auth.uid() and exists (select 1 from public.chat_members cm where cm.chat_id = messages.chat_id and cm.user_id = auth.uid())
);
create policy "sender_can_update_own_message" on public.messages for update to authenticated using (sender_id = auth.uid()) with check (sender_id = auth.uid());

create policy "member_can_react" on public.message_reactions for all to authenticated using (
  exists (
    select 1 from public.messages m
    join public.chat_members cm on cm.chat_id = m.chat_id
    where m.id = message_reactions.message_id and cm.user_id = auth.uid()
  )
) with check (
  user_id = auth.uid() and exists (
    select 1 from public.messages m
    join public.chat_members cm on cm.chat_id = m.chat_id
    where m.id = message_reactions.message_id and cm.user_id = auth.uid()
  )
);

create policy "self_task_crud" on public.message_tasks for all to authenticated using (created_by = auth.uid()) with check (created_by = auth.uid());
create policy "self_reminder_crud" on public.message_reminders for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "member_can_read_calls" on public.calls for select to authenticated using (
  caller_id = auth.uid() or receiver_id = auth.uid() or exists (select 1 from public.chat_members cm where cm.chat_id = calls.chat_id and cm.user_id = auth.uid())
);
create policy "caller_can_insert_call" on public.calls for insert to authenticated with check (caller_id = auth.uid());

create policy "status_owner_crud" on public.status_updates for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "status_viewer_crud" on public.status_views for all to authenticated using (viewer_id = auth.uid()) with check (viewer_id = auth.uid());

create policy "self_ai_logs" on public.ai_logs for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "self_spam_reports" on public.spam_reports for all to authenticated using (reporter_id = auth.uid()) with check (reporter_id = auth.uid());
create policy "self_blocks" on public.blocked_users for all to authenticated using (blocker_id = auth.uid()) with check (blocker_id = auth.uid());
