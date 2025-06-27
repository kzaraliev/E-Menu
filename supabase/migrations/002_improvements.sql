-- Migration 002: Schema improvements
-- 1. Add UNIQUE constraint on menu_items.name per category
-- 2. Add sort_order columns for ordering
-- 3. Prepare for future i18n support

-- Add sort_order columns to categories and menu_items
ALTER TABLE categories ADD COLUMN sort_order INT DEFAULT 0;
ALTER TABLE menu_items ADD COLUMN sort_order INT DEFAULT 0;

-- Add UNIQUE constraint on menu item names per category
-- This prevents duplicate menu items within the same category
ALTER TABLE menu_items ADD CONSTRAINT unique_menu_item_name_per_category 
    UNIQUE (name, category_id);

-- Add UNIQUE constraint on category names per restaurant
-- This prevents duplicate category names within the same restaurant
ALTER TABLE categories ADD CONSTRAINT unique_category_name_per_restaurant 
    UNIQUE (name, restaurant_id);

-- Create indexes for sort_order columns for better performance
CREATE INDEX idx_categories_sort_order ON categories(restaurant_id, sort_order);
CREATE INDEX idx_menu_items_sort_order ON menu_items(category_id, sort_order);

-- Add a default language column to restaurants for future i18n support
ALTER TABLE restaurants ADD COLUMN default_language VARCHAR(5) DEFAULT 'bg';

-- Create table for future menu item translations (prepared but not used yet)
CREATE TABLE menu_item_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    language_code VARCHAR(5) NOT NULL, -- 'en', 'bg', etc.
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(menu_item_id, language_code)
);

-- Create table for future category translations
CREATE TABLE category_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    language_code VARCHAR(5) NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(category_id, language_code)
);

-- Enable RLS on translation tables
ALTER TABLE menu_item_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_translations ENABLE ROW LEVEL SECURITY;

-- RLS policies for translation tables
CREATE POLICY "Users can manage translations of their menu items" ON menu_item_translations
    FOR ALL USING (
        menu_item_id IN (
            SELECT id FROM menu_items WHERE restaurant_id IN (
                SELECT id FROM restaurants WHERE owner_id = auth.uid()
            )
        )
    );

CREATE POLICY "Public can view menu item translations" ON menu_item_translations
    FOR SELECT USING (true);

CREATE POLICY "Users can manage translations of their categories" ON category_translations
    FOR ALL USING (
        category_id IN (
            SELECT id FROM categories WHERE restaurant_id IN (
                SELECT id FROM restaurants WHERE owner_id = auth.uid()
            )
        )
    );

CREATE POLICY "Public can view category translations" ON category_translations
    FOR SELECT USING (true);

-- Add triggers for translation tables
CREATE TRIGGER update_menu_item_translations_updated_at BEFORE UPDATE ON menu_item_translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_category_translations_updated_at BEFORE UPDATE ON category_translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments to explain the schema
COMMENT ON TABLE restaurants IS 'Main restaurant information with owner reference';
COMMENT ON TABLE categories IS 'Menu categories (Starters, Main Dishes, etc.) with sort ordering';
COMMENT ON TABLE menu_items IS 'Individual menu items with base information';
COMMENT ON TABLE menu_item_variants IS 'Price variants for menu items (Small, Medium, Large, etc.)';
COMMENT ON TABLE menu_item_translations IS 'Translations for menu items (prepared for future i18n)';
COMMENT ON TABLE category_translations IS 'Translations for categories (prepared for future i18n)';

COMMENT ON COLUMN categories.sort_order IS 'Order of categories in menu display (0 = first)';
COMMENT ON COLUMN menu_items.sort_order IS 'Order of items within category (0 = first)';
COMMENT ON COLUMN restaurants.default_language IS 'Default language for restaurant (bg, en, etc.)'; 