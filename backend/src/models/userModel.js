const pool = require('../config/database');

const findById = async (id) => {
  const query = `
    SELECT id, name, email, phone, profile_image_url, is_verified_shelter, created_at 
    FROM users 
    WHERE id = $1
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

const findByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0] || null;
};

const create = async (userData) => {
  const query = `
    INSERT INTO users (name, email, password_hash, phone, is_verified_shelter)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, phone, is_verified_shelter, created_at
  `;
  const values = [
    userData.name,
    userData.email,
    userData.password_hash,
    userData.phone || null,
    userData.is_verified_shelter || false,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  findById,
  findByEmail,
  create,
};
