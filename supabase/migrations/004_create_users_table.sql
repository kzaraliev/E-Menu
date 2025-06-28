-- Simple users table for subscription tracking
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  plan_id TEXT, -- Stripe price ID - NULL means no subscription
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own record
CREATE POLICY "Users can view own record" ON users
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can update their own record  
CREATE POLICY "Users can update own record" ON users
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: System can insert new user records
CREATE POLICY "System can insert user records" ON users
  FOR INSERT WITH CHECK (true);

-- Auto-create user record on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (user_id, plan_id)
  VALUES (NEW.id, NULL); -- NULL = no subscription
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 