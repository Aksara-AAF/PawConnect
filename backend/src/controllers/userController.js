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

const getMyPets = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await userService.getMyPets(userId);
    return success(res, data, 'Daftar hewan Anda berhasil diambil');
  } catch (err) {
    next(err);
  }
};

const getMyRequests = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await userService.getMyRequests(userId);
    return success(res, data, 'Daftar pengajuan adopsi Anda berhasil diambil');
  } catch (err) {
    next(err);
  }
};

const getIncomingRequests = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const data = await userService.getIncomingRequests(userId);
    return success(res, data, 'Daftar permintaan masuk berhasil diambil');
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
  getMyPets,
  getMyRequests,
  getIncomingRequests,
  getMyDonations,
};
