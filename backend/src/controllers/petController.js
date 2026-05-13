const petService = require('../services/petService');
const { success, error } = require('../utils/responseHelper');

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

/**
 * GET /api/pets/:id
 */
const getPetById = async (req, res, next) => {
  try {
    const pet = await petService.getPetById(parseInt(req.params.id));
    return success(res, pet, 'Detail hewan berhasil diambil');
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/pets
 * Body: { name, species, gender, age, location, description, health_notes }
 * Requires auth (uploader_id dari session)
 */
const createPet = async (req, res, next) => {
  try {
    // TODO: ganti dengan req.userId dari authMiddleware setelah Daffa implementasi
    const uploaderId = req.body.uploader_id;

    const newPet = await petService.createPet(req.body, uploaderId);
    return success(res, newPet, 'Hewan berhasil ditambahkan', 201);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/pets/:id
 * Body: { name, species, gender, age, location, description, health_notes }
 * Requires auth
 */
const updatePet = async (req, res, next) => {
  try {
    // TODO: ganti dengan req.userId dari authMiddleware
    const userId = req.body.uploader_id;

    const updatedPet = await petService.updatePet(
      parseInt(req.params.id),
      req.body,
      userId
    );
    return success(res, updatedPet, 'Data hewan berhasil diperbarui');
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/pets/:id
 * Requires auth
 */
const deletePet = async (req, res, next) => {
  try {
    // TODO: ganti dengan req.userId dari authMiddleware
    const userId = parseInt(req.query.user_id);

    const deletedPet = await petService.deletePet(
      parseInt(req.params.id),
      userId
    );
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
