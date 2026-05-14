const userModel = require('../models/userModel');
const petModel = require('../models/petModel');

const getUserPets = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) {
    const err = new Error('User tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  const pets = await petModel.selectByUploader(userId);
  return {
    user,
    pets,
  };
};

module.exports = {
  getUserPets,
};
