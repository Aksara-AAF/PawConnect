const petModel = require('../models/petModel');
const { uploadImage, uploadVideo, deleteImage } = require('../utils/cloudinaryUpload');

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

const createPet = async (petData, uploaderId, files) => {
  if (!petData.name || !petData.species) {
    const err = new Error('Nama dan species hewan wajib diisi');
    err.statusCode = 400;
    throw err;
  }

  let imageUrl = null;
  if (files && files.image) {
    const uploaded = await uploadImage(files.image[0].buffer);
    imageUrl = uploaded.url;
  }

  let videoUrl = null;
  if (files && files.video) {
    const uploaded = await uploadVideo(files.video[0].buffer);
    videoUrl = uploaded.url;
  }

  const newPet = await petModel.insert({
    ...petData,
    uploader_id: uploaderId,
    image_url: imageUrl,
    video_url: videoUrl,
  });

  return newPet;
};

const updatePet = async (id, petData, userId, files) => {
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
  if (files && files.image) {
    if (existingPet.image_url) {
      await deleteImage(existingPet.image_url).catch((err) =>
        console.error('Cloudinary delete error:', err)
      );
    }
    const uploaded = await uploadImage(files.image[0].buffer);
    imageUrl = uploaded.url;
  }

  let videoUrl = existingPet.video_url;
  if (files && files.video) {
    if (existingPet.video_url) {
      await deleteImage(existingPet.video_url, 'video').catch((err) =>
        console.error('Cloudinary delete error:', err)
      );
    }
    const uploaded = await uploadVideo(files.video[0].buffer);
    videoUrl = uploaded.url;
  }

  const updatedPet = await petModel.update(id, { 
    ...petData, 
    image_url: imageUrl,
    video_url: videoUrl
  });
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

  if (existingPet.video_url) {
    await deleteImage(existingPet.video_url, 'video').catch((err) =>
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
