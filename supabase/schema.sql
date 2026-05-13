-- Supabase PostgreSQL schema for ArtisanPH marketplace

create extension if not exists pgcrypto;

create type user_role as enum ('client', 'creator', 'admin');
create type listing_status as enum ('draft', 'published', 'archived');
create type commission_status as enum ('pending', 'accepted', 'in_progress', 'completed', 'cancelled', 'declined');
create type booking_status as enum ('requested', 'confirmed', 'completed', 'cancelled');

-- App-level user profiles
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid unique references auth.users(id) on delete cascade,
  email text not null unique,
  role user_role not null default 'client',
  display_name text,
  avatar_url text,
  bio text,
  location text,
  social_links jsonb,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_users_role on public.users(role);
create index if not exists idx_users_email on public.users(email);

-- Artists profile details
create table if not exists public.artists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  studio_name text,
  headline text,
  categories text[] not null default array[]::text[],
  portfolio jsonb,
  rating numeric(3,2) not null default 0,
  reviews_count int not null default 0,
  hourly_rate numeric(10,2),
  languages text[] default array[]::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint artists_user_unique unique (user_id)
);

create index if not exists idx_artists_categories on public.artists using gin (categories);
create index if not exists idx_artists_rating on public.artists(rating desc);

-- Marketplace listings by artists
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  title text not null,
  description text,
  price_from numeric(10,2) not null,
  currency text not null default 'PHP',
  tags text[] not null default array[]::text[],
  gallery jsonb,
  commission_options jsonb,
  status listing_status not null default 'published',
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_listings_tags on public.listings using gin (tags);
create index if not exists idx_listings_status on public.listings(status);
create index if not exists idx_listings_artist on public.listings(artist_id);

-- Commission orders tied to listings
create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete set null,
  buyer_id uuid not null references public.users(id) on delete cascade,
  artist_id uuid not null references public.artists(id) on delete cascade,
  status commission_status not null default 'pending',
  amount numeric(10,2) not null,
  currency text not null default 'PHP',
  details text,
  due_date date,
  delivered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_commissions_status on public.commissions(status);
create index if not exists idx_commissions_buyer on public.commissions(buyer_id);
create index if not exists idx_commissions_artist on public.commissions(artist_id);

-- Booking requests for consultations or project scheduling
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  listing_id uuid references public.listings(id) on delete set null,
  scheduled_at timestamptz not null,
  status booking_status not null default 'requested',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_bookings_status on public.bookings(status);
create index if not exists idx_bookings_artist on public.bookings(artist_id);
create index if not exists idx_bookings_user on public.bookings(user_id);

-- Reviews for artists and listings
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.users(id) on delete cascade,
  artist_id uuid references public.artists(id) on delete cascade,
  listing_id uuid references public.listings(id) on delete set null,
  rating smallint not null check (rating between 1 and 5),
  content text,
  featured boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_reviews_artist on public.reviews(artist_id);
create index if not exists idx_reviews_listing on public.reviews(listing_id);
create index if not exists idx_reviews_rating on public.reviews(rating desc);

-- Messages between users / artist communication
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.users(id) on delete cascade,
  recipient_id uuid not null references public.users(id) on delete cascade,
  commission_id uuid references public.commissions(id) on delete set null,
  booking_id uuid references public.bookings(id) on delete set null,
  content text not null,
  attachments jsonb,
  read boolean not null default false,
  sent_at timestamptz not null default now()
);

create index if not exists idx_messages_sender on public.messages(sender_id);
create index if not exists idx_messages_recipient on public.messages(recipient_id);
create index if not exists idx_messages_commission on public.messages(commission_id);
create index if not exists idx_messages_booking on public.messages(booking_id);
