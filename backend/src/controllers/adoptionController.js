const adoptionService = require('../services/adoptionService');
const { success } = require('../utils/responseHelper');

const createRequest = async (req, res, next) => {
  try {
    const adopterId = req.body.adopter_id;

    if (!adopterId) {
      const err = new Error('Adopter ID wajib disertakan untuk simulasi saat ini');
      err.statusCode = 401;
      throw err;
    }

    const newRequest = await adoptionService.createRequest(req.body, parseInt(adopterId));
    return success(res, newRequest, 'Pengajuan adopsi berhasil dikirim', 201);
  } catch (err) {
    next(err);
  }
};

const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const uploaderId = req.body.uploader_id;

    if (!uploaderId) {
      const err = new Error('Uploader ID wajib disertakan untuk otorisasi simulasi');
      err.statusCode = 401;
      throw err;
    }

    const updatedRequest = await adoptionService.updateRequestStatus(
      parseInt(req.params.id),
      status,
      parseInt(uploaderId)
    );
    return success(res, updatedRequest, `Status pengajuan berhasil diubah menjadi ${status}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRequest,
  updateRequestStatus,
};
