-- ============================================================
-- Migration: Add role column to users table
-- ============================================================

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'user';

-- Set akun admin manual untuk testing:
-- UPDATE users SET role = 'admin' WHERE email = 'admin@pawconnect.id';
