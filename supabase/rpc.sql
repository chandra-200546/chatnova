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
