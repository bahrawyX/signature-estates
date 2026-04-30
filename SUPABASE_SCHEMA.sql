-- Signature Estates — Supabase schema
-- Run this once in the Supabase SQL Editor before seeding.

-- ── Locations ──────────────────────────────────────────────────────────────
create table if not exists locations (
  id text primary key,
  name text not null,
  arabic_name text,
  region text not null,
  description text not null,
  image text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Developers ─────────────────────────────────────────────────────────────
create table if not exists developers (
  id text primary key,
  name text not null,
  short_name text,
  established integer not null,
  description text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Properties (depends on locations + developers) ─────────────────────────
create table if not exists properties (
  id text primary key,
  slug text unique not null,
  name text not null,
  type text not null,
  status text not null,
  location_id text not null references locations(id),
  developer_id text not null references developers(id),
  bedrooms integer not null default 0,
  bathrooms integer not null default 0,
  area_sqm numeric not null,
  floor_number integer,
  price_egp numeric not null,
  description text not null,
  amenities text[] not null default '{}',
  images jsonb not null default '[]',
  featured boolean not null default false,
  map_url text not null,
  delivery_year integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── News articles ──────────────────────────────────────────────────────────
create table if not exists news (
  id text primary key,
  slug text unique not null,
  title text not null,
  excerpt text not null,
  body text[] not null default '{}',
  category text not null,
  author text not null,
  published_at text not null,
  read_minutes integer not null default 3,
  cover text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Row Level Security: public reads, admin writes via service role ────────
alter table locations  enable row level security;
alter table developers enable row level security;
alter table properties enable row level security;
alter table news       enable row level security;

drop policy if exists "Public read" on locations;
drop policy if exists "Public read" on developers;
drop policy if exists "Public read" on properties;
drop policy if exists "Public read" on news;

create policy "Public read" on locations  for select using (true);
create policy "Public read" on developers for select using (true);
create policy "Public read" on properties for select using (true);
create policy "Public read" on news       for select using (true);

-- ── Auto-update updated_at ─────────────────────────────────────────────────
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_loc_upd  on locations;
drop trigger if exists trg_dev_upd  on developers;
drop trigger if exists trg_prop_upd on properties;
drop trigger if exists trg_news_upd on news;

create trigger trg_loc_upd  before update on locations
  for each row execute function update_updated_at_column();
create trigger trg_dev_upd  before update on developers
  for each row execute function update_updated_at_column();
create trigger trg_prop_upd before update on properties
  for each row execute function update_updated_at_column();
create trigger trg_news_upd before update on news
  for each row execute function update_updated_at_column();
