-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create jobs table
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  company text not null,
  description text not null,
  location text not null,
  job_type text not null check (job_type in ('Full-Time', 'Part-Time', 'Contract')),
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create saved jobs table
create table public.saved_jobs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, job_id)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.saved_jobs enable row level security;

-- Create policies for profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create policies for jobs
create policy "Jobs are viewable by everyone."
  on jobs for select
  using ( true );

create policy "Authenticated users can create jobs."
  on jobs for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update their own jobs."
  on jobs for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own jobs."
  on jobs for delete
  using ( auth.uid() = user_id );

-- Create policies for saved jobs
create policy "Users can view their own saved jobs."
  on saved_jobs for select
  using ( auth.uid() = user_id );

create policy "Users can save jobs."
  on saved_jobs for insert
  with check ( auth.uid() = user_id );

create policy "Users can unsave their own saved jobs."
  on saved_jobs for delete
  using ( auth.uid() = user_id );

-- Create function to automatically create a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger to automatically create profile
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create indexes for better performance
create index idx_jobs_user_id on public.jobs(user_id);
create index idx_jobs_created_at on public.jobs(created_at desc);
create index idx_jobs_job_type on public.jobs(job_type);
create index idx_jobs_location on public.jobs(location);
create index idx_saved_jobs_user_id on public.saved_jobs(user_id);
create index idx_saved_jobs_job_id on public.saved_jobs(job_id);

-- Create a function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers to automatically update updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

create trigger update_jobs_updated_at
  before update on public.jobs
  for each row execute procedure public.update_updated_at_column();