const userService = require('../services/userService');
const donationService = require('../services/donationService');
const { success } = require('../utils/responseHelper');

const getUserPets = async (req, res, next) => {
  try {
    const data = await userService.getUserPets(req.params.id);
    return success(res, data, 'Daftar hewan milik user berhasil diambil');
  } catch (err) {
    next(err);
  }
};

const getMyDonations = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await donationService.getByDonor(userId);
    return success(res, data, 'Riwayat donasi berhasil diambil');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserPets,
  getMyDonations,
};
