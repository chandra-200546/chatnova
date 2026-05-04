-- RPC helpers for client-safe chat creation
create or replace function public.create_direct_chat(other_user uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  existing_chat uuid;
  new_chat uuid;
begin
  if me is null then
    raise exception 'Not authenticated';
  end if;

  select cm1.chat_id into existing_chat
  from chat_members cm1
  join chat_members cm2 on cm1.chat_id = cm2.chat_id
  join chats c on c.id = cm1.chat_id
  where cm1.user_id = me and cm2.user_id = other_user and c.type = 'direct'
  limit 1;

  if existing_chat is not null then
    return existing_chat;
  end if;

  insert into chats (type, title, created_by)
  values ('direct', null, me)
  returning id into new_chat;

  insert into chat_members (chat_id, user_id, role)
  values
    (new_chat, me, 'owner'),
    (new_chat, other_user, 'member');

  return new_chat;
end;
$$;

grant execute on function public.create_direct_chat(uuid) to authenticated;

create or replace function public.create_test_chat()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  existing_chat uuid;
  new_chat uuid;
begin
  if me is null then
    raise exception 'Not authenticated';
  end if;

  select c.id into existing_chat
  from public.chats c
  join public.chat_members cm on cm.chat_id = c.id
  where cm.user_id = me
    and c.type = 'ai'
    and c.title = 'ChatNova Test Bot'
  limit 1;

  if existing_chat is not null then
    return existing_chat;
  end if;

  insert into public.chats (type, title, created_by)
  values ('ai', 'ChatNova Test Bot', me)
  returning id into new_chat;

  insert into public.chat_members (chat_id, user_id, role)
  values (new_chat, me, 'owner');

  insert into public.messages (chat_id, sender_id, type, content, status)
  values (new_chat, null, 'system', 'Test bot is ready. Send a message to start testing.', 'delivered');

  return new_chat;
end;
$$;

grant execute on function public.create_test_chat() to authenticated;

create or replace function public.send_test_message(p_chat_id uuid, p_content text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  reply_text text;
begin
  if me is null then
    raise exception 'Not authenticated';
  end if;

  if not exists (
    select 1
    from public.chat_members cm
    join public.chats c on c.id = cm.chat_id
    where cm.chat_id = p_chat_id
      and cm.user_id = me
      and c.type = 'ai'
      and c.title = 'ChatNova Test Bot'
  ) then
    raise exception 'Invalid test chat';
  end if;

  insert into public.messages (chat_id, sender_id, type, content, status)
  values (p_chat_id, me, 'text', coalesce(nullif(trim(p_content), ''), 'Hi'), 'delivered');

  reply_text := (
    array[
      'Echo: ' || coalesce(nullif(trim(p_content), ''), 'Hi'),
      'Message received. Delivery and chat flow are working.',
      'Bot reply: You can now test send, receive, and chat list updates.',
      'Looks good. Try sending image/voice placeholders next.'
    ]
  )[1 + floor(random() * 4)::int];

  insert into public.messages (chat_id, sender_id, type, content, status)
  values (p_chat_id, null, 'text', reply_text, 'read');

  update public.chats
  set updated_at = now()
  where id = p_chat_id;
end;
$$;

grant execute on function public.send_test_message(uuid, text) to authenticated;
