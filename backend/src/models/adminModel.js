const pool = require('../config/database');

// Ambil semua campaign yang belum diverifikasi (pending)
const selectPending = async () => {
  const query = `
    SELECT
      c.id,
      c.title,
      c.organizer,
      c.description,
      c.image_url,
      c.target_amount,
      c.end_date,
      c.is_verified,
      c.created_at,
      u.id    AS creator_id,
      u.name  AS creator_name,
      u.email AS creator_email
    FROM campaigns c
    JOIN users u ON u.id = c.user_id
    WHERE c.is_verified = false
    ORDER BY c.created_at ASC
  `;
  const result = await pool.query(query);
  return result.rows;
};

// Set is_verified = true untuk satu campaign
const verifyCampaign = async (id) => {
  const query = `
    UPDATE campaigns
    SET is_verified = true
    WHERE id = $1
    RETURNING id, title, organizer, is_verified, created_at
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

// Hapus (tolak) campaign pending
const deleteCampaign = async (id) => {
  const query = `
    DELETE FROM campaigns
    WHERE id = $1 AND is_verified = false
    RETURNING id, title
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

// Ambil daftar user yang mengajukan verifikasi shelter
const selectPendingShelters = async () => {
  const query = `
    SELECT id, name, email, phone, created_at
    FROM users
    WHERE shelter_requested = true
      AND is_verified_shelter = false
      AND role != 'admin'
    ORDER BY created_at ASC
  `;
  const result = await pool.query(query);
  return result.rows;
};

// Set is_verified_shelter = true dan shelter_requested = false
const verifyShelter = async (id) => {
  const query = `
    UPDATE users
    SET is_verified_shelter = true,
        shelter_requested    = false
    WHERE id = $1
    RETURNING id, name, email, is_verified_shelter
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

module.exports = { selectPending, verifyCampaign, deleteCampaign, selectPendingShelters, verifyShelter };

