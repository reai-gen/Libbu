create extension if not exists pgcrypto;

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null unique,
  city text not null,
  stage text not null,
  building text not null,
  challenge text not null
);

alter table public.waitlist enable row level security;

create policy "Anyone can join the waitlist"
on public.waitlist
for insert
to anon
with check (true);

create policy "Waitlist remains private"
on public.waitlist
for select
to anon
using (false);
