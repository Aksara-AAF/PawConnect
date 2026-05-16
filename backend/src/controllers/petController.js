const petService = require('../services/petService');
const { success, error } = require('../utils/responseHelper');
const { invalidatePetsCache } = require('../middleware/cacheMiddleware');

const getAllPets = async (req, res, next) => {
  try {
    const filters = {
      species: req.query.species,
      location: req.query.location,
      status: req.query.status,
    };

    const pets = await petService.getAllPets(filters);
    return success(res, pets, 'Daftar hewan berhasil diambil');
  } catch (err) {
    next(err);
  }
};

const getPetById = async (req, res, next) => {
  try {
    const pet = await petService.getPetById(req.params.id);
    return success(res, pet, 'Detail hewan berhasil diambil');
  } catch (err) {
    next(err);
  }
};

const createPet = async (req, res, next) => {
  try {
    const uploaderId = req.user.userId;
    const newPet = await petService.createPet(req.body, uploaderId, req.file);
    await invalidatePetsCache();
    return success(res, newPet, 'Hewan berhasil ditambahkan', 201);
  } catch (err) {
    next(err);
  }
};

const updatePet = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const updatedPet = await petService.updatePet(req.params.id, req.body, userId, req.file);
    await invalidatePetsCache();
    return success(res, updatedPet, 'Data hewan berhasil diperbarui');
  } catch (err) {
    next(err);
  }
};

const deletePet = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const deletedPet = await petService.deletePet(req.params.id, userId);
    await invalidatePetsCache();
    return success(res, deletedPet, 'Hewan berhasil dihapus');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
