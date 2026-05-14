const userService = require('../services/userService');
const { success } = require('../utils/responseHelper');

const getUserPets = async (req, res, next) => {
  try {
    const data = await userService.getUserPets(req.params.id);
    return success(res, data, 'Daftar hewan milik user berhasil diambil');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserPets,
};
