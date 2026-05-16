const campaignModel = require('../models/campaignModel');
const userModel = require('../models/userModel');
const { uploadImage } = require('../utils/cloudinaryUpload');

const getAllCampaigns = async () => {
  return await campaignModel.selectAllVerified();
};

const getCampaignById = async (id) => {
  const campaign = await campaignModel.selectById(id);
  if (!campaign) {
    const err = new Error('Campaign tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }
  return campaign;
};

const getMyCampaigns = async (userId) => {
  return await campaignModel.selectByUserId(userId);
};

const createCampaign = async (userId, campaignData, imageFile) => {
  // Cek apakah user sudah terverifikasi sebagai shelter
  const user = await userModel.findById(userId);
  if (!user || !user.is_verified_shelter) {
    const err = new Error('Hanya akun shelter yang terverifikasi yang dapat membuat campaign');
    err.statusCode = 403;
    throw err;
  }

  // Gunakan nama akun user sebagai organizer secara otomatis
  const organizer = user.name;

  const { title, description, target_amount, end_date } = campaignData;

  if (!title || !target_amount || !end_date) {
    const err = new Error('title, target_amount, dan end_date wajib diisi');
    err.statusCode = 400;
    throw err;
  }

  if (Number(target_amount) <= 0) {
    const err = new Error('Target donasi harus lebih dari 0');
    err.statusCode = 400;
    throw err;
  }

  if (new Date(end_date) <= new Date()) {
    const err = new Error('Tanggal akhir campaign harus di masa depan');
    err.statusCode = 400;
    throw err;
  }

  let imageUrl = null;
  if (imageFile) {
    const uploaded = await uploadImage(imageFile.buffer, 'pawconnect/campaigns');
    imageUrl = uploaded.url;
  }

  const newCampaign = await campaignModel.insert({
    user_id: userId,
    title,
    organizer,
    description,
    image_url: imageUrl,
    target_amount: Number(target_amount),
    end_date,
  });

  return newCampaign;
};

module.exports = {
  getAllCampaigns,
  getCampaignById,
  getMyCampaigns,
  createCampaign,
};
