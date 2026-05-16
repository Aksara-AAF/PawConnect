const campaignService = require('../services/campaignService');
const { success, error } = require('../utils/responseHelper');

const getAllCampaigns = async (req, res, next) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    return success(res, campaigns, 'Daftar campaign berhasil diambil');
  } catch (err) {
    next(err);
  }
};

const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await campaignService.getCampaignById(req.params.id);
    return success(res, campaign, 'Detail campaign berhasil diambil');
  } catch (err) {
    if (err.statusCode === 404) {
      return error(res, err.message, 404);
    }
    next(err);
  }
};

const createCampaign = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const imageFile = req.file || null;
    const newCampaign = await campaignService.createCampaign(userId, req.body, imageFile);
    return success(res, newCampaign, 'Campaign berhasil dibuat, menunggu verifikasi admin', 201);
  } catch (err) {
    if (err.statusCode === 403) {
      return error(res, err.message, 403);
    }
    if (err.statusCode === 400) {
      return error(res, err.message, 400);
    }
    next(err);
  }
};

const getMyCampaigns = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const campaigns = await campaignService.getMyCampaigns(userId);
    return success(res, campaigns, 'Daftar campaign Anda berhasil diambil');
  } catch (err) {
    next(err);
  }
};

const deleteMyCampaign = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const campaignModel = require('../models/campaignModel');
    const deleted = await campaignModel.deleteCampaign(id, userId);
    if (!deleted) {
      return error(res, 'Campaign tidak ditemukan atau bukan milik Anda', 404);
    }
    return success(res, deleted, 'Campaign berhasil dihapus');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  getMyCampaigns,
  deleteMyCampaign,
};
