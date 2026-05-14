const pool = require('../config/database');

const insert = async (adoptionData) => {
  const query = `
    INSERT INTO adoption_requests (pet_id, adopter_id, application_reason)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [
    adoptionData.pet_id,
    adoptionData.adopter_id,
    adoptionData.application_reason,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const selectById = async (id) => {
  const query = `
    SELECT 
      ar.*,
      p.name AS pet_name,
      p.species AS pet_species,
      p.image_url AS pet_image_url,
      p.uploader_id,
      u.name AS adopter_name,
      u.email AS adopter_email,
      u.phone AS adopter_phone
    FROM adoption_requests ar
    JOIN pets p ON ar.pet_id = p.id
    JOIN users u ON ar.adopter_id = u.id
    WHERE ar.id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

const updateStatus = async (id, status) => {
  const query = `
    UPDATE adoption_requests 
    SET status = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *
  `;
  const result = await pool.query(query, [status, id]);
  return result.rows[0] || null;
};

const selectByAdopter = async (adopterId) => {
  const query = `
    SELECT 
      ar.*,
      p.name AS pet_name,
      p.species AS pet_species,
      p.image_url AS pet_image_url,
      p.status AS pet_status
    FROM adoption_requests ar
    JOIN pets p ON ar.pet_id = p.id
    WHERE ar.adopter_id = $1
    ORDER BY ar.request_date DESC
  `;
  const result = await pool.query(query, [adopterId]);
  return result.rows;
};

const selectByUploader = async (uploaderId) => {
  const query = `
    SELECT 
      ar.*,
      p.name AS pet_name,
      p.image_url AS pet_image_url,
      u.name AS adopter_name,
      u.email AS adopter_email
    FROM adoption_requests ar
    JOIN pets p ON ar.pet_id = p.id
    JOIN users u ON ar.adopter_id = u.id
    WHERE p.uploader_id = $1
    ORDER BY ar.request_date DESC
  `;
  const result = await pool.query(query, [uploaderId]);
  return result.rows;
};

const checkExistingActiveRequest = async (petId, adopterId) => {
  const query = `
    SELECT * FROM adoption_requests
    WHERE pet_id = $1 AND adopter_id = $2 AND status IN ('Menunggu', 'Diterima')
  `;
  const result = await pool.query(query, [petId, adopterId]);
  return result.rows[0] || null;
};

module.exports = {
  insert,
  selectById,
  updateStatus,
  selectByAdopter,
  selectByUploader,
  checkExistingActiveRequest,
};
