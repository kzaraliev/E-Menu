-- Migration 006: Complete Restaurant Blocking
-- Block all access to inactive restaurants while preserving data

-- Create helper function to check if restaurant is active
CREATE OR REPLACE FUNCTION restaurant_is_active(restaurant_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM restaurants 
    WHERE id = restaurant_uuid 
    AND is_active = true 
    AND user_has_active_subscription(owner_id)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update restaurants RLS policies to be more restrictive
DROP POLICY IF EXISTS "Users can view own restaurants" ON restaurants;
DROP POLICY IF EXISTS "Users can manage own restaurants" ON restaurants;
DROP POLICY IF EXISTS "Public can view active restaurants" ON restaurants;

-- Users can only view their own restaurants if they have active subscription
CREATE POLICY "Users can view own restaurants with active subscription" ON restaurants
  FOR SELECT USING (
    owner_id = auth.uid() AND user_has_active_subscription(auth.uid())
  );

-- Users can only manage their own restaurants if they have active subscription
CREATE POLICY "Users can manage own restaurants with active subscription" ON restaurants
  FOR ALL USING (
    owner_id = auth.uid() AND user_has_active_subscription(auth.uid())
  );

-- Public can only view active restaurants (for public menu access)
CREATE POLICY "Public can view active restaurants only" ON restaurants
  FOR SELECT USING (is_active = true);

-- Update categories RLS policies
DROP POLICY IF EXISTS "Users can manage categories of their restaurants" ON categories;
DROP POLICY IF EXISTS "Public can view categories" ON categories;

CREATE POLICY "Users can manage categories of active restaurants" ON categories
  FOR ALL USING (
    restaurant_id IN (
      SELECT id FROM restaurants 
      WHERE owner_id = auth.uid() 
      AND user_has_active_subscription(auth.uid())
      AND is_active = true
    )
  );

CREATE POLICY "Public can view categories of active restaurants" ON categories
  FOR SELECT USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE is_active = true
    )
  );

-- Update menu_items RLS policies  
DROP POLICY IF EXISTS "Users can manage menu items of their restaurants" ON menu_items;
DROP POLICY IF EXISTS "Public can view menu items" ON menu_items;

CREATE POLICY "Users can manage menu items of active restaurants" ON menu_items
  FOR ALL USING (
    restaurant_id IN (
      SELECT id FROM restaurants 
      WHERE owner_id = auth.uid() 
      AND user_has_active_subscription(auth.uid())
      AND is_active = true
    )
  );

CREATE POLICY "Public can view menu items of active restaurants" ON menu_items
  FOR SELECT USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE is_active = true
    )
  );

-- Update menu_item_variants RLS policies
DROP POLICY IF EXISTS "Users can manage variants of their menu items" ON menu_item_variants;
DROP POLICY IF EXISTS "Public can view menu item variants" ON menu_item_variants;

CREATE POLICY "Users can manage variants of active restaurant items" ON menu_item_variants
  FOR ALL USING (
    menu_item_id IN (
      SELECT id FROM menu_items WHERE restaurant_id IN (
        SELECT id FROM restaurants 
        WHERE owner_id = auth.uid() 
        AND user_has_active_subscription(auth.uid())
        AND is_active = true
      )
    )
  );

CREATE POLICY "Public can view variants of active restaurant items" ON menu_item_variants
  FOR SELECT USING (
    menu_item_id IN (
      SELECT id FROM menu_items WHERE restaurant_id IN (
        SELECT id FROM restaurants WHERE is_active = true
      )
    )
  );

-- Update translation tables RLS policies if they exist
DROP POLICY IF EXISTS "Users can manage translations of their menu items" ON menu_item_translations;
DROP POLICY IF EXISTS "Public can view menu item translations" ON menu_item_translations;
DROP POLICY IF EXISTS "Users can manage translations of their categories" ON category_translations;
DROP POLICY IF EXISTS "Public can view category translations" ON category_translations;

CREATE POLICY "Users can manage translations of active restaurant items" ON menu_item_translations
  FOR ALL USING (
    menu_item_id IN (
      SELECT id FROM menu_items WHERE restaurant_id IN (
        SELECT id FROM restaurants 
        WHERE owner_id = auth.uid() 
        AND user_has_active_subscription(auth.uid())
        AND is_active = true
      )
    )
  );

CREATE POLICY "Public can view translations of active restaurant items" ON menu_item_translations
  FOR SELECT USING (
    menu_item_id IN (
      SELECT id FROM menu_items WHERE restaurant_id IN (
        SELECT id FROM restaurants WHERE is_active = true
      )
    )
  );

CREATE POLICY "Users can manage translations of active restaurant categories" ON category_translations
  FOR ALL USING (
    category_id IN (
      SELECT id FROM categories WHERE restaurant_id IN (
        SELECT id FROM restaurants 
        WHERE owner_id = auth.uid() 
        AND user_has_active_subscription(auth.uid())
        AND is_active = true
      )
    )
  );

CREATE POLICY "Public can view translations of active restaurant categories" ON category_translations
  FOR SELECT USING (
    category_id IN (
      SELECT id FROM categories WHERE restaurant_id IN (
        SELECT id FROM restaurants WHERE is_active = true
      )
    )
  );

-- Add comments
COMMENT ON FUNCTION restaurant_is_active IS 'Check if restaurant is both active and user has subscription';

-- Create function to check if user can access specific restaurant
CREATE OR REPLACE FUNCTION user_can_access_restaurant(restaurant_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM restaurants 
    WHERE id = restaurant_uuid 
    AND owner_id = user_uuid 
    AND is_active = true 
    AND user_has_active_subscription(user_uuid)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION user_can_access_restaurant IS 'Check if specific user can access specific restaurant'; 