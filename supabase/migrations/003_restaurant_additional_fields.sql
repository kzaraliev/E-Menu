-- Migration 003: Add additional fields to restaurants table

-- Add optional fields to restaurants table
ALTER TABLE restaurants ADD COLUMN description TEXT;
ALTER TABLE restaurants ADD COLUMN address TEXT;
ALTER TABLE restaurants ADD COLUMN phone TEXT;
ALTER TABLE restaurants ADD COLUMN website TEXT;

-- Add comments
COMMENT ON COLUMN restaurants.description IS 'Optional restaurant description';
COMMENT ON COLUMN restaurants.address IS 'Optional restaurant address';
COMMENT ON COLUMN restaurants.phone IS 'Optional restaurant phone number';
COMMENT ON COLUMN restaurants.website IS 'Optional restaurant website URL'; 