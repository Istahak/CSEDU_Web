-- Migration to add missing columns to profiles table

-- Add full_name column if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name VARCHAR;

-- Add contact_number column if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_number VARCHAR;

-- Add reg_no column if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS reg_no VARCHAR UNIQUE;

-- Add bio column if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio VARCHAR;

-- Add image_id column if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS image_id UUID REFERENCES images(id);

-- Update nullable constraints
ALTER TABLE profiles ALTER COLUMN full_name DROP NOT NULL;
ALTER TABLE profiles ALTER COLUMN contact_number DROP NOT NULL;
