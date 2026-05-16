const donationService = require('../services/donationService');
const { success, error } = require('../utils/responseHelper');

const createDonation = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { amount, message, campaign_id } = req.body;

    if (!amount) {
      return error(res, 'Amount is required', 400);
    }

    const donation = await donationService.createDonation(userId, { amount, message, campaign_id });
    return success(res, donation, 'Donation created successfully', 201);
  } catch (err) {
    if (err.message === 'Invalid donation amount') {
      return error(res, err.message, 400);
    }
    next(err);
  }
};

const confirmDonation = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const donation = await donationService.confirmDonation(id);
    return success(res, donation, 'Donation confirmed successfully', 200);
  } catch (err) {
    if (err.message === 'Donation not found') {
      return error(res, err.message, 404);
    }
    next(err);
  }
};

module.exports = {
  createDonation,
  confirmDonation
};