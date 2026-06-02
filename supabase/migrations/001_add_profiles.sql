-- Migration: Add profiles table with unique constraints for email, username, phone_number

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  username text not null,
  email text not null,
  phone_number text not null,
  avatar_url text,
  role user_role not null default 'client',
  is_phone_verified boolean not null default false,
  bio text,
  location text,
  created_at timestamptz not null default now()
);

alter table public.profiles add constraint profiles_email_unique unique (email);
alter table public.profiles add constraint profiles_username_unique unique (username);
alter table public.profiles add constraint profiles_phone_unique unique (phone_number);

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_profiles_phone on public.profiles(phone_number);
