create table public.registration_leads (
  id bigint generated always as identity primary key,
  name text not null check (char_length(btrim(name)) between 1 and 120),
  email text not null check (char_length(btrim(email)) between 3 and 320),
  phone text not null check (char_length(btrim(phone)) between 10 and 32),
  profession text not null check (
    profession in (
      'Student',
      'Freelancer',
      'Startup Founder',
      'Business Owner',
      'Agency Owner',
      'Other'
    )
  ),
  created_at timestamptz not null default now()
);

alter table public.registration_leads enable row level security;

revoke all on table public.registration_leads from anon, authenticated;
revoke all on sequence public.registration_leads_id_seq from anon, authenticated;

create index registration_leads_created_at_idx
  on public.registration_leads (created_at desc);
