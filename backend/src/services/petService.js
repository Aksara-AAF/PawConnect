const petModel = require('../models/petModel');
const { uploadImage, deleteImage } = require('../utils/cloudinaryUpload');

const getAllPets = async (filters) => {
  return await petModel.selectAll(filters);
};

const getPetById = async (id) => {
  const pet = await petModel.selectById(id);
  if (!pet) {
    const err = new Error('Pet tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }
  return pet;
};

const createPet = async (petData, uploaderId, file) => {
  if (!petData.name || !petData.species) {
    const err = new Error('Nama dan species hewan wajib diisi');
    err.statusCode = 400;
    throw err;
  }

  let imageUrl = null;
  if (file) {
    const uploaded = await uploadImage(file.buffer);
    imageUrl = uploaded.url;
  }

  const newPet = await petModel.insert({
    ...petData,
    uploader_id: uploaderId,
    image_url: imageUrl,
  });

  return newPet;
};

const updatePet = async (id, petData, userId, file) => {
  const existingPet = await petModel.selectById(id);

  if (!existingPet) {
    const err = new Error('Pet tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  if (existingPet.uploader_id !== userId) {
    const err = new Error('Anda tidak memiliki izin untuk mengedit hewan ini');
    err.statusCode = 403;
    throw err;
  }

  if (!petData.name || !petData.species) {
    const err = new Error('Nama dan species hewan wajib diisi');
    err.statusCode = 400;
    throw err;
  }

  let imageUrl = existingPet.image_url;
  if (file) {
    if (existingPet.image_url) {
      await deleteImage(existingPet.image_url).catch((err) =>
        console.error('Cloudinary delete error:', err)
      );
    }
    const uploaded = await uploadImage(file.buffer);
    imageUrl = uploaded.url;
  }

  const updatedPet = await petModel.update(id, { ...petData, image_url: imageUrl });
  return updatedPet;
};

const deletePet = async (id, userId) => {
  const existingPet = await petModel.selectById(id);

  if (!existingPet) {
    const err = new Error('Pet tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  if (existingPet.uploader_id !== userId) {
    const err = new Error('Anda tidak memiliki izin untuk menghapus hewan ini');
    err.statusCode = 403;
    throw err;
  }

  if (existingPet.image_url) {
    await deleteImage(existingPet.image_url).catch((err) =>
      console.error('Cloudinary delete error:', err)
    );
  }

  return await petModel.remove(id);
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
