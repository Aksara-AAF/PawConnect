const donationModel = require('../models/donationModel');

const createDonation = async (userId, donationData) => {
  if (!donationData.amount || Number(donationData.amount) <= 0) {
    throw new Error('Invalid donation amount');
  }

  const newDonation = await donationModel.insert({
    donor_id: userId,
    amount: donationData.amount,
    message: donationData.message
  });

  return newDonation;
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
  getByDonor
};