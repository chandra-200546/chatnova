-- Storage buckets and policies
insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('chat-media', 'chat-media', false),
  ('status-media', 'status-media', true)
on conflict (id) do nothing;

create policy "avatars_read_public" on storage.objects for select to public using (bucket_id = 'avatars');
create policy "avatars_write_owner" on storage.objects for insert to authenticated with check (bucket_id = 'avatars' and owner = auth.uid());

create policy "chat_media_member_read" on storage.objects for select to authenticated using (bucket_id = 'chat-media');
create policy "chat_media_owner_write" on storage.objects for insert to authenticated with check (bucket_id = 'chat-media' and owner = auth.uid());

create policy "status_media_public_read" on storage.objects for select to public using (bucket_id = 'status-media');
create policy "status_media_owner_write" on storage.objects for insert to authenticated with check (bucket_id = 'status-media' and owner = auth.uid());
