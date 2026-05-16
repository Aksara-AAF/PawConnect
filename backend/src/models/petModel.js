const pool = require('../config/database');

const selectAll = async (filters = {}) => {
  let query = `
    SELECT 
      p.*, 
      u.name AS uploader_name,
      u.is_verified_shelter
    FROM pets p
    JOIN users u ON p.uploader_id = u.id
    WHERE 1=1
  `;
  const values = [];
  let paramCount = 0;

  if (filters.species) {
    paramCount++;
    query += ` AND p.species = $${paramCount}`;
    values.push(filters.species);
  }

  if (filters.location) {
    paramCount++;
    query += ` AND p.location ILIKE $${paramCount}`;
    values.push(`%${filters.location}%`);
  }

  if (filters.status) {
    paramCount++;
    query += ` AND p.status = $${paramCount}`;
    values.push(filters.status);
  }

  query += ` ORDER BY p.created_at DESC`;

  const result = await pool.query(query, values);
  return result.rows;
};

const selectById = async (id) => {
  const query = `
    SELECT 
      p.*, 
      u.name AS uploader_name,
      u.email AS uploader_email,
      u.phone AS uploader_phone,
      u.is_verified_shelter
    FROM pets p
    JOIN users u ON p.uploader_id = u.id
    WHERE p.id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

const selectByUploader = async (uploaderId) => {
  const query = `
    SELECT * FROM pets 
    WHERE uploader_id = $1 
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query, [uploaderId]);
  return result.rows;
};

const insert = async (petData) => {
  const query = `
    INSERT INTO pets (uploader_id, name, species, gender, age, location, description, health_notes, image_url, video_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;
  const values = [
    petData.uploader_id,
    petData.name,
    petData.species,
    petData.gender || null,
    petData.age || null,
    petData.location || null,
    petData.description || null,
    petData.health_notes || null,
    petData.image_url || null,
    petData.video_url || null,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const update = async (id, petData) => {
  const query = `
    UPDATE pets 
    SET name = $1, species = $2, gender = $3, age = $4, location = $5,
        description = $6, health_notes = $7, image_url = $8, video_url = $9, updated_at = NOW()
    WHERE id = $10
    RETURNING *
  `;
  const values = [
    petData.name,
    petData.species,
    petData.gender || null,
    petData.age || null,
    petData.location || null,
    petData.description || null,
    petData.health_notes || null,
    petData.image_url || null,
    petData.video_url || null,
    id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

const updateStatus = async (id, status) => {
  const query = `
    UPDATE pets SET status = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *
  `;
  const result = await pool.query(query, [status, id]);
  return result.rows[0] || null;
};

const remove = async (id) => {
  const query = `DELETE FROM pets WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

module.exports = {
  selectAll,
  selectById,
  selectByUploader,
  insert,
  update,
  updateStatus,
  remove,
};
