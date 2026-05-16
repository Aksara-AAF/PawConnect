const adoptionService = require('../services/adoptionService');
const { success, error } = require('../utils/responseHelper');
const { invalidatePetsCache } = require('../middleware/cacheMiddleware');

const createRequest = async (req, res, next) => {
  try {
    const adopterId = req.user.userId;
    const newRequest = await adoptionService.createRequest(req.body, adopterId);
    return success(res, newRequest, 'Pengajuan adopsi berhasil dikirim', 201);
  } catch (err) {
    next(err);
  }
};

const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const uploaderId = req.user.userId;

    if (!status) {
      return error(res, 'Status wajib disertakan', 400);
    }

    const updatedRequest = await adoptionService.updateRequestStatus(
      req.params.id,
      status,
      uploaderId
    );
    await invalidatePetsCache();
    return success(res, updatedRequest, `Status pengajuan berhasil diubah menjadi ${status}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRequest,
  updateRequestStatus,
};
