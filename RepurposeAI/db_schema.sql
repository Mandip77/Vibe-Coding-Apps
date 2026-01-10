-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  tier text default 'free',
  usage_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Function to handle new user signup automatically
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, tier, usage_count)
  values (new.id, 'free', 0);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
