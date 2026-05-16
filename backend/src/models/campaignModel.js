const pool = require('../config/database');

// Ambil semua campaign yang sudah terverifikasi (untuk katalog publik)
const selectAllVerified = async () => {
  const query = `
    SELECT
      c.id,
      c.title,
      c.organizer,
      c.description,
      c.image_url,
      c.target_amount,
      c.collected_amount,
      c.donators_count,
      c.end_date,
      c.is_verified,
      c.created_at,
      CASE
        WHEN c.target_amount > 0
        THEN ROUND((c.collected_amount / c.target_amount) * 100, 2)
        ELSE 0
      END AS progress_percent
    FROM campaigns c
    WHERE c.is_verified = true
      AND c.end_date >= CURRENT_DATE
    ORDER BY c.created_at DESC
  `;
  const result = await pool.query(query);
  return result.rows;
};

// Ambil detail satu campaign beserta data pembuatnya
const selectById = async (id) => {
  const query = `
    SELECT
      c.id,
      c.title,
      c.organizer,
      c.description,
      c.image_url,
      c.target_amount,
      c.collected_amount,
      c.donators_count,
      c.end_date,
      c.is_verified,
      c.created_at,
      CASE
        WHEN c.target_amount > 0
        THEN ROUND((c.collected_amount / c.target_amount) * 100, 2)
        ELSE 0
      END AS progress_percent,
      u.id    AS creator_id,
      u.email AS creator_email
    FROM campaigns c
    JOIN users u ON u.id = c.user_id
    WHERE c.id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

// Ambil semua campaign milik satu user
const selectByUserId = async (userId) => {
  const query = `
    SELECT
      id,
      title,
      organizer,
      image_url,
      target_amount,
      collected_amount,
      donators_count,
      end_date,
      is_verified,
      created_at,
      CASE
        WHEN target_amount > 0
        THEN ROUND((collected_amount / target_amount) * 100, 2)
        ELSE 0
      END AS progress_percent
    FROM campaigns
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Buat campaign baru
const insert = async (campaignData) => {
  const query = `
    INSERT INTO campaigns (user_id, title, organizer, description, image_url, target_amount, end_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING
      id, user_id, title, organizer, description, image_url,
      target_amount, collected_amount, donators_count, end_date, is_verified, created_at
  `;
  const values = [
    campaignData.user_id,
    campaignData.title,
    campaignData.organizer,
    campaignData.description || null,
    campaignData.image_url || null,
    campaignData.target_amount,
    campaignData.end_date,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Update collected_amount dan donators_count — dipanggil di dalam transaksi eksternal
const incrementCollected = async (client, campaignId, amount) => {
  const query = `
    UPDATE campaigns
    SET
      collected_amount = collected_amount + $2,
      donators_count   = donators_count + 1
    WHERE id = $1
    RETURNING id, collected_amount, donators_count
  `;
  const result = await client.query(query, [campaignId, amount]);
  return result.rows[0] || null;
};

// Hapus campaign milik sendiri (oleh pemilik)
const deleteCampaign = async (campaignId, userId) => {
  const query = `
    DELETE FROM campaigns
    WHERE id = $1 AND user_id = $2
    RETURNING id, title
  `;
  const result = await pool.query(query, [campaignId, userId]);
  return result.rows[0] || null;
};

module.exports = {
  selectAllVerified,
  selectById,
  selectByUserId,
  insert,
  incrementCollected,
  deleteCampaign,
};
