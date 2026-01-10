-- Add Stripe columns to profiles table
alter table profiles 
add column if not exists stripe_customer_id text,
add column if not exists subscription_status text default 'inactive';

-- Optional: Create a table for webhooks logs if needed later
-- create table webhook_logs (...);
