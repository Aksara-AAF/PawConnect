const userModel = require('../models/userModel');
const petModel = require('../models/petModel');
const adoptionModel = require('../models/adoptionModel');

const getUserPets = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) {
    const err = new Error('User tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }
  const pets = await petModel.selectByUploader(userId);
  return { user, pets };
};

const getMyPets = async (userId) => {
  return await petModel.selectByUploader(userId);
};

const getMyRequests = async (userId) => {
  return await adoptionModel.selectByAdopter(userId);
};

const getIncomingRequests = async (userId) => {
  return await adoptionModel.selectByUploader(userId);
};

const applyShelter = async (userId) => {
  const result = await userModel.apply(userId);
  if (!result) {
    const err = new Error('Akun tidak ditemukan atau sudah terverifikasi sebagai shelter');
    err.statusCode = 400;
    throw err;
  }
  return result;
};

module.exports = {
  getUserPets,
  getMyPets,
  getMyRequests,
  getIncomingRequests,
  applyShelter,
};
