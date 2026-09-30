
-- DHRUV GYAN — Supabase schema (Problem 26063)
create extension if not exists vector; -- pgvector for RAG embeddings

create type role_name as enum ('public','student','teacher','researcher','editor','admin');
create type content_type as enum ('publication','expedition-report','dataset','photo','video','education','activity');
create type region_name as enum ('Arctic','Antarctica','Himalaya','Southern Ocean');

-- array_to_string() is only STABLE, and generated columns need IMMUTABLE expressions,
-- so wrap it in an immutable helper for the full-text search column below.
create or replace function immutable_array_to_string(arr text[], sep text)
returns text language sql immutable parallel safe as $$
  select array_to_string(arr, sep)
$$;

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text not null,
  role role_name not null default 'public',
  created_at timestamptz default now()
);

create table expeditions (
  id uuid primary key default gen_random_uuid(),
  name text not null, season text, year int, region region_name,
  station text, leader text, team_size int, description text,
  objectives jsonb default '[]', research_areas jsonb default '[]', ongoing boolean default false
);

create table stations (
  id uuid primary key default gen_random_uuid(),
  name text not null, region region_name, country text,
  lat double precision, lon double precision, established int,
  purpose text, research_areas jsonb default '[]', current_activities jsonb default '[]'
);

create table resources (
  id uuid primary key default gen_random_uuid(),
  title text not null, type content_type not null, year int,
  authors text[] default '{}', region region_name, domain text,
  abstract text, keywords text[] default '{}', tags text[] default '{}',
  expedition_id uuid references expeditions(id),
  language text default 'English', citation text,
  file_path text, thumbnail_path text, file_size text, doi text,
  published boolean default false,
  embedding vector(1536),
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(abstract,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(immutable_array_to_string(keywords,' '),'')), 'C') ||
    setweight(to_tsvector('english', coalesce(immutable_array_to_string(authors,' '),'')), 'C')
  ) stored,
  created_at timestamptz default now()
);
create index resources_search_idx on resources using gin (search_vector);
create index resources_year_idx on resources (year);
create index resources_region_idx on resources (region);
create index resources_domain_idx on resources (domain);
create index resources_type_idx on resources (type);
create index resources_embedding_idx on resources using ivfflat (embedding vector_cosine_ops);

create table media_assets (
  id uuid primary key default gen_random_uuid(),
  kind text not null, title text not null, date date, location text,
  expedition text, tags text[] default '{}', credit text, description text,
  file_path text, license text, approved boolean default false
);

create table education_modules (
  id uuid primary key default gen_random_uuid(),
  topic text, title text not null, audience text, level text,
  description text, lessons jsonb default '[]'
);

create table quiz_questions (
  id uuid primary key default gen_random_uuid(),
  topic text not null, question text not null, options text[] not null,
  answer_index int not null, explanation text
);

create table quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id), topic text, score int, total int, created_at timestamptz default now()
);

create table news (
  id uuid primary key default gen_random_uuid(),
  date date, category text, title text not null, excerpt text, body text
);

create table ai_content (
  id uuid primary key default gen_random_uuid(),
  resource_id uuid references resources(id),
  content_type text, tone text, language text,
  title text, body text, caption text, hashtags text[] default '{}',
  status text default 'draft', -- draft | in-review | approved | published | rejected
  created_by uuid references profiles(id), created_at timestamptz default now()
);

create table saved_resources (
  user_id uuid references profiles(id), resource_id uuid references resources(id),
  primary key (user_id, resource_id)
);

-- Create a profile row automatically for every new auth user
create or replace function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- Row Level Security
alter table profiles enable row level security;
create policy "read own profile" on profiles for select using (id = auth.uid());

alter table expeditions enable row level security;
create policy "public read expeditions" on expeditions for select using (true);
alter table stations enable row level security;
create policy "public read stations" on stations for select using (true);
alter table education_modules enable row level security;
create policy "public read modules" on education_modules for select using (true);
alter table quiz_questions enable row level security;
create policy "public read quiz questions" on quiz_questions for select using (true);
alter table news enable row level security;
create policy "public read news" on news for select using (true);
alter table media_assets enable row level security;
create policy "public read approved media" on media_assets for select using (approved = true);
alter table quiz_attempts enable row level security;
create policy "own quiz attempts" on quiz_attempts for all using (user_id = auth.uid());
alter table saved_resources enable row level security;
create policy "own saved resources" on saved_resources for all using (user_id = auth.uid());

alter table resources enable row level security;
create policy "public read published" on resources for select using (published = true);
create policy "staff manage" on resources for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('editor','admin'))
);

alter table ai_content enable row level security;
create policy "staff review ai content" on ai_content for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('editor','admin'))
);

-- FTS query example used by the server-side search path:
-- select * from resources
--   where search_vector @@ plainto_tsquery('english', :q)
--   order by ts_rank(search_vector, plainto_tsquery('english', :q)) desc;
