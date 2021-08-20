create type public.app_permission as enum (
  'users.delete', 'user_roles.insert', 'user_roles.delete', 'user_roles.update', 
  'topics.insert', 'topics.delete', 'topics.update', 
  'posts.update', 'posts.delete', 'posts.insert'
);
create type public.app_role as enum ('admin', 'moderator', 'user');

-- authorize with role-based access control (RBAC)
create function public.authorize(
  requested_permission app_permission,
  user_id uuid
)
returns boolean as $$
declare
  bind_permissions int;
begin
  select count(*)
  from public.role_permissions
  inner join public.user_roles on role_permissions.role = user_roles.role
  where role_permissions.permission = authorize.requested_permission
    and user_roles.user_id = authorize.user_id
  into bind_permissions;
  
  return bind_permissions > 0;
end;
$$ language plpgsql security definer;

/** 
* USERS
* Note: This table contains user data. Users should only be able to view and update their own data.
*/
create table public.users (
  -- UUID from auth.users
  id uuid references auth.users not null primary key,
  full_name text,
  description text,
  avatar_url text,
  location text
);
comment on table public.users is 'Additional user details';
alter table public.users enable row level security;

create policy "Allow all read access" on public.users for select using ( true );
create policy "Allow individual update access" on public.users for update using ( auth.uid() = id );
create policy "Allow authorized delete access" on public.users for delete using ( authorize('users.delete', auth.uid()) );

-- Topics
create table public.topics (
  id bigint generated by default as identity primary key,
  title text,
  description text
);
comment on table public.topics is 'All topics which can be posted to';
alter table public.topics enable row level security;

create policy "Allow authorized insert access" on public.topics for insert with check ( authorize('topics.insert', auth.uid()) );
create policy "Allow authorized update access" on public.topics for update using ( authorize('topics.update', auth.uid()) );
create policy "Allow authorized delete access" on public.topics for delete using ( authorize('topics.delete', auth.uid()) );
create policy "Allow all select access" on public.topics for select using ( true );


-- Posts
create table public.posts (
  id bigint generated by default as identity primary key,
  user_id uuid references public.users not null,
  topic_id bigint references public.topics not null,
  title text not null,
  description text,
  content text not null,
  created_at timestamp with time zone not null default now(),
  salt_stage int,
  views int not null default 0,
  previous_salt_post_id int,
  tags text[]
); 
create policy "Allow authorized insert access" on public.posts for insert with check ( 
  auth.uid() = user_id or authorize('posts.insert', auth.uid()) 
);
create policy "Allow authorized update access" on public.posts for update using ( 
  auth.uid() = user_id or authorize('posts.update', auth.uid()) 
);
create policy "Allow authorized delete access" on public.posts for delete using ( 
  auth.uid() = user_id or authorize('posts.delete', auth.uid()) 
);
create policy "Allow all select access" on public.posts for select using ( true );



-- USER ROLES
create table public.user_roles (
  id        bigint generated by default as identity primary key,
  user_id   uuid references public.users on delete cascade not null,
  role      app_role not null,
  unique (user_id, role)
);
comment on table public.user_roles is 'Application roles for each user.';
alter table public.user_roles enable row level security;

create policy "Allow authorized insert access" on public.user_roles for insert with check ( authorize('user_roles.insert', auth.uid()) );
create policy "Allow authorized update access" on public.user_roles for update using ( authorize('user_roles.update', auth.uid()) );
create policy "Allow authorized delete access" on public.user_roles for delete using ( authorize('user_roles.delete', auth.uid()) );

-- ROLE PERMISSIONS
create table public.role_permissions (
  id           bigint generated by default as identity primary key,
  role         app_role not null,
  permission   app_permission not null,
  unique (role, permission)
);
comment on table public.role_permissions is 'Application permissions for each role.';
alter table public.role_permissions enable row level security;

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
*/ 
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */
drop publication if exists supabase_realtime;
create publication supabase_realtime for table posts;
