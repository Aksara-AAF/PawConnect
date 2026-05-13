const petModel = require('../models/petModel');

const getAllPets = async (filters) => {
  const pets = await petModel.selectAll(filters);
  return pets;
};

const getPetById = async (id) => {
  const pet = await petModel.selectById(id);
  if (!pet) {
    const error = new Error('Pet tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
  return pet;
};

const createPet = async (petData, uploaderId) => {
  if (!petData.name || !petData.species) {
    const error = new Error('Nama dan species hewan wajib diisi');
    error.statusCode = 400;
    throw error;
  }

  const newPet = await petModel.insert({
    ...petData,
    uploader_id: uploaderId,
  });

  return newPet;
};

const updatePet = async (id, petData, userId) => {
  const existingPet = await petModel.selectById(id);

  if (!existingPet) {
    const error = new Error('Pet tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  if (existingPet.uploader_id !== userId) {
    const error = new Error('Anda tidak memiliki izin untuk mengedit hewan ini');
    error.statusCode = 403;
    throw error;
  }

  if (!petData.name || !petData.species) {
    const error = new Error('Nama dan species hewan wajib diisi');
    error.statusCode = 400;
    throw error;
  }

  const updatedPet = await petModel.update(id, {
    ...petData,
    image_url: petData.image_url || existingPet.image_url,
  });

  return updatedPet;
};

const deletePet = async (id, userId) => {
  const existingPet = await petModel.selectById(id);

  if (!existingPet) {
    const error = new Error('Pet tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  if (existingPet.uploader_id !== userId) {
    const error = new Error('Anda tidak memiliki izin untuk menghapus hewan ini');
    error.statusCode = 403;
    throw error;
  }

  const deletedPet = await petModel.remove(id);
  return deletedPet;
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
