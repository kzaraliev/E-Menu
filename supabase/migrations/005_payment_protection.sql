-- Migration 005: Payment Protection
-- Add payment protection logic and restaurant activation system

-- Add is_active column to restaurants table
ALTER TABLE restaurants ADD COLUMN is_active BOOLEAN DEFAULT true;

-- Create helper function to check if user has active subscription
CREATE OR REPLACE FUNCTION user_has_active_subscription(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users 
    WHERE user_id = user_uuid AND plan_id IS NOT NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user's restaurant count
CREATE OR REPLACE FUNCTION user_restaurant_count(user_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) FROM restaurants 
    WHERE owner_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to activate/deactivate user restaurants based on subscription
CREATE OR REPLACE FUNCTION update_user_restaurant_status(user_uuid UUID, active BOOLEAN)
RETURNS VOID AS $$
BEGIN
  UPDATE restaurants 
  SET is_active = active 
  WHERE owner_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies for restaurants to include subscription check
DROP POLICY IF EXISTS "Users can view own restaurants" ON restaurants;
DROP POLICY IF EXISTS "Users can manage own restaurants" ON restaurants;

-- Users can only view their own active restaurants OR all their restaurants if they have subscription
CREATE POLICY "Users can view own restaurants" ON restaurants
  FOR SELECT USING (
    owner_id = auth.uid() AND (
      is_active = true OR user_has_active_subscription(auth.uid())
    )
  );

-- Users can only manage restaurants if they have active subscription
CREATE POLICY "Users can manage own restaurants" ON restaurants
  FOR ALL USING (
    owner_id = auth.uid() AND user_has_active_subscription(auth.uid())
  );

-- Prevent creating more than 1 restaurant per user
CREATE OR REPLACE FUNCTION check_restaurant_limit()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user already has a restaurant
  IF user_restaurant_count(NEW.owner_id) >= 1 THEN
    RAISE EXCEPTION 'Можете да създадете само един ресторант';
  END IF;
  
  -- Check if user has active subscription
  IF NOT user_has_active_subscription(NEW.owner_id) THEN
    RAISE EXCEPTION 'Трябва активен план за създаване на ресторант';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to check restaurant limit on insert
CREATE TRIGGER restaurant_limit_check
  BEFORE INSERT ON restaurants
  FOR EACH ROW EXECUTE FUNCTION check_restaurant_limit();

-- Deactivate restaurants for users without subscription
UPDATE restaurants 
SET is_active = false 
WHERE owner_id IN (
  SELECT user_id FROM users WHERE plan_id IS NULL
);

-- Add comments
COMMENT ON COLUMN restaurants.is_active IS 'Restaurant is accessible only when user has active subscription';
COMMENT ON FUNCTION user_has_active_subscription IS 'Check if user has active subscription (plan_id IS NOT NULL)';
COMMENT ON FUNCTION user_restaurant_count IS 'Count how many restaurants user has';
COMMENT ON FUNCTION update_user_restaurant_status IS 'Activate/deactivate all user restaurants based on subscription status'; 