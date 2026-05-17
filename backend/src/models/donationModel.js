const pool = require('../config/database');

const insert = async (donationData) => {
  const query = `
    INSERT INTO donations (donor_id, amount, message, campaign_id, payment_status)
    VALUES ($1, $2, $3, $4, 'Success')
    RETURNING id, donor_id, amount, message, campaign_id, payment_status, created_at
  `;
  const values = [
    donationData.donor_id,
    donationData.amount,
    donationData.message || null,
    donationData.campaign_id || null,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const confirmPayment = async (id) => {
  const query = `
    UPDATE donations 
    SET payment_status = 'Success'
    WHERE id = $1
    RETURNING id, donor_id, amount, message, payment_status, created_at
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const selectByDonor = async (donorId) => {
  const query = `
    SELECT
      d.id, d.amount, d.message, d.payment_status, d.created_at,
      c.title AS campaign_title
    FROM donations d
    LEFT JOIN campaigns c ON d.campaign_id = c.id
    WHERE d.donor_id = $1
    ORDER BY d.created_at DESC
  `;
  const result = await pool.query(query, [donorId]);
  return result.rows;
};

module.exports = {
  insert,
  confirmPayment,
  selectByDonor
};