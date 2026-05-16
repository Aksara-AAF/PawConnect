-- ============================================================
-- Migration: Add Campaigns Feature
-- Run this script once on your PostgreSQL database
-- ============================================================

-- 1. Buat tabel campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title            VARCHAR(255) NOT NULL,
  organizer        VARCHAR(255) NOT NULL,
  description      TEXT,
  image_url        TEXT,
  target_amount    DECIMAL(15, 2) NOT NULL CHECK (target_amount > 0),
  collected_amount DECIMAL(15, 2) NOT NULL DEFAULT 0,
  donators_count   INT NOT NULL DEFAULT 0,
  end_date         DATE NOT NULL,
  is_verified      BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Update tabel donations: tambahkan kolom campaign_id (nullable agar donasi lama tetap valid)
ALTER TABLE donations
  ADD COLUMN IF NOT EXISTS campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL;

-- 3. Indeks untuk performa query
CREATE INDEX IF NOT EXISTS idx_campaigns_user_id    ON campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_is_verified ON campaigns(is_verified);
CREATE INDEX IF NOT EXISTS idx_donations_campaign_id ON donations(campaign_id);
