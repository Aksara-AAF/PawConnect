const pool = require('../config/database');
const donationModel = require('../models/donationModel');
const campaignModel = require('../models/campaignModel');

/**
 * Membuat donasi baru.
 * Jika campaign_id disertakan, seluruh operasi dijalankan di dalam satu transaksi DB:
 *   1. INSERT ke tabel donations
 *   2. UPDATE campaigns.collected_amount & donators_count
 * Jika salah satu gagal, seluruh transaksi di-ROLLBACK.
 */
const createDonation = async (userId, donationData) => {
  const { amount, message, campaign_id } = donationData;

  if (!amount || Number(amount) <= 0) {
    throw new Error('Invalid donation amount');
  }

  // Donasi tanpa campaign (donasi umum) – tanpa transaksi
  if (!campaign_id) {
    return await donationModel.insert({
      donor_id: userId,
      amount: Number(amount),
      message: message || null,
      campaign_id: null,
    });
  }

  // Donasi ke campaign – gunakan DB Transaction
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Step 1: Insert donasi
    const insertQuery = `
      INSERT INTO donations (donor_id, amount, message, campaign_id, payment_status)
      VALUES ($1, $2, $3, $4, 'Success')
      RETURNING id, donor_id, amount, message, campaign_id, payment_status, created_at
    `;
    const donationResult = await client.query(insertQuery, [
      userId,
      Number(amount),
      message || null,
      campaign_id,
    ]);
    const newDonation = donationResult.rows[0];

    // Step 2: Update ringkasan campaign
    const updatedCampaign = await campaignModel.incrementCollected(client, campaign_id, Number(amount));
    if (!updatedCampaign) {
      throw new Error('Campaign tidak ditemukan');
    }

    await client.query('COMMIT');
    return newDonation;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const confirmDonation = async (donationId) => {
  const confirmedDonation = await donationModel.confirmPayment(donationId);
  if (!confirmedDonation) {
    throw new Error('Donation not found');
  }
  return confirmedDonation;
};

const getByDonor = async (donorId) => {
  return await donationModel.selectByDonor(donorId);
};

module.exports = {
  createDonation,
  confirmDonation,
  getByDonor,
};