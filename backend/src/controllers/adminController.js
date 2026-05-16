const adminModel = require('../models/adminModel');
const { success, error } = require('../utils/responseHelper');

// GET /api/admin/campaigns/pending
const getPendingCampaigns = async (req, res, next) => {
  try {
    const campaigns = await adminModel.selectPending();
    return success(res, campaigns, `${campaigns.length} campaign menunggu verifikasi`);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/admin/campaigns/:id/verify
const verifyCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const verified = await adminModel.verifyCampaign(id);
    if (!verified) {
      return error(res, 'Campaign tidak ditemukan', 404);
    }
    return success(res, verified, `Campaign "${verified.title}" berhasil diverifikasi`);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/campaigns/:id  (Tolak pengajuan)
const rejectCampaign = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await adminModel.deleteCampaign(id);
    if (!deleted) {
      return error(res, 'Campaign tidak ditemukan atau sudah terverifikasi', 404);
    }
    return success(res, deleted, `Campaign "${deleted.title}" telah ditolak dan dihapus`);
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/shelters/pending
const getPendingShelters = async (req, res, next) => {
  try {
    const shelters = await adminModel.selectPendingShelters();
    return success(res, shelters, `${shelters.length} pengajuan shelter menunggu verifikasi`);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/admin/shelters/:id/verify
const verifyShelter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const verified = await adminModel.verifyShelter(id);
    if (!verified) {
      return error(res, 'User tidak ditemukan', 404);
    }
    return success(res, verified, `Shelter "${verified.name}" berhasil diverifikasi`);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPendingCampaigns, verifyCampaign, rejectCampaign, getPendingShelters, verifyShelter };

