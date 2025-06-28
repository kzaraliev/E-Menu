-- Migration 007: Flexible Restaurant Access
-- Allow users to view their restaurants but restrict management of inactive ones

-- Update restaurants RLS policies for more flexible access
DROP POLICY IF EXISTS "Users can view own restaurants with active subscription" ON restaurants;
DROP POLICY IF EXISTS "Users can manage own restaurants with active subscription" ON restaurants;

-- Users can view ALL their own restaurants (active and inactive)
CREATE POLICY "Users can view own restaurants" ON restaurants
  FOR SELECT USING (owner_id = auth.uid());

-- Users can only INSERT new restaurants if they have active subscription AND can create more
CREATE POLICY "Users can create restaurants with active subscription" ON restaurants
  FOR INSERT WITH CHECK (
    owner_id = auth.uid() 
    AND user_has_active_subscription(auth.uid())
    AND (
      SELECT COUNT(*) FROM restaurants WHERE owner_id = auth.uid()
    ) < 1  -- Limit to 1 restaurant per user
  );

-- Users can only UPDATE/DELETE their restaurants if they have active subscription AND restaurant is active
CREATE POLICY "Users can update active restaurants with subscription" ON restaurants
  FOR UPDATE USING (
    owner_id = auth.uid() 
    AND user_has_active_subscription(auth.uid())
    AND is_active = true
  );

CREATE POLICY "Users can delete active restaurants with subscription" ON restaurants
  FOR DELETE USING (
    owner_id = auth.uid() 
    AND user_has_active_subscription(auth.uid())
    AND is_active = true
  );

-- Update categories RLS policies for more flexible access
DROP POLICY IF EXISTS "Users can manage categories of active restaurants" ON categories;

CREATE POLICY "Users can view categories of own restaurants" ON categories
  FOR SELECT USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage categories of active restaurants only" ON categories
  FOR ALL USING (
    restaurant_id IN (
      SELECT id FROM restaurants 
      WHERE owner_id = auth.uid() 
      AND user_has_active_subscription(auth.uid())
      AND is_active = true
    )
  );

-- Update menu_items RLS policies
DROP POLICY IF EXISTS "Users can manage menu items of active restaurants" ON menu_items;

CREATE POLICY "Users can view menu items of own restaurants" ON menu_items
  FOR SELECT USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage menu items of active restaurants only" ON menu_items
  FOR ALL USING (
    restaurant_id IN (
      SELECT id FROM restaurants 
      WHERE owner_id = auth.uid() 
      AND user_has_active_subscription(auth.uid())
      AND is_active = true
    )
  );

-- Update menu_item_variants RLS policies
DROP POLICY IF EXISTS "Users can manage variants of active restaurant items" ON menu_item_variants;

CREATE POLICY "Users can view variants of own restaurant items" ON menu_item_variants
  FOR SELECT USING (
    menu_item_id IN (
      SELECT id FROM menu_items WHERE restaurant_id IN (
        SELECT id FROM restaurants WHERE owner_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can manage variants of active restaurant items only" ON menu_item_variants
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

-- Update translation tables RLS policies
DROP POLICY IF EXISTS "Users can manage translations of active restaurant items" ON menu_item_translations;
DROP POLICY IF EXISTS "Users can manage translations of active restaurant categories" ON category_translations;

CREATE POLICY "Users can view item translations of own restaurants" ON menu_item_translations
  FOR SELECT USING (
    menu_item_id IN (
      SELECT id FROM menu_items WHERE restaurant_id IN (
        SELECT id FROM restaurants WHERE owner_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can manage item translations of active restaurants only" ON menu_item_translations
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

CREATE POLICY "Users can view category translations of own restaurants" ON category_translations
  FOR SELECT USING (
    category_id IN (
      SELECT id FROM categories WHERE restaurant_id IN (
        SELECT id FROM restaurants WHERE owner_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can manage category translations of active restaurants only" ON category_translations
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

-- Public policies remain the same (only active restaurants)
-- No changes needed for public access policies 