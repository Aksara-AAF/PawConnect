-- ============================================================
-- Migration: Add shelter_requested flag to users
-- ============================================================

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS shelter_requested BOOLEAN NOT NULL DEFAULT false;

-- Index untuk query admin yang cepat
CREATE INDEX IF NOT EXISTS idx_users_shelter_requested ON users(shelter_requested);

-- Cara user mengajukan verifikasi shelter (jalankan dari akun yang ingin apply):
-- UPDATE users SET shelter_requested = true WHERE id = '<user_id>';
