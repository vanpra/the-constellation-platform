drop policy "Allow authorized insert access" on public.user_roles;
drop policy "Allow authorized update access" on public.user_roles;
drop policy "Allow authorized delete access" on public.user_roles;

drop policy "Allow all select access" on public.posts;
drop policy "Allow authorized delete access" on public.posts;
drop policy "Allow authorized update access" on public.posts;
drop policy "Allow authorized insert access" on public.posts;

drop policy "Allow authorized insert access" on public.topics;
drop policy "Allow authorized update access" on public.topics;
drop policy "Allow authorized delete access" on public.topics;
drop policy "Allow all select access" on public.topics;

drop policy "Allow logged-in read access" on public.users;
drop policy "Allow individual update access" on public.users;
drop policy "Allow authorized delete access" on public.users;

drop trigger on_auth_user_created on auth.users;
drop function public.authorize;
drop function public.handle_new_user;

drop table public.user_roles;
drop table public.role_permissions;
drop table public.posts;
drop table public.topics;
drop table public.users;

drop type public.app_permission;
drop type public.app_role;