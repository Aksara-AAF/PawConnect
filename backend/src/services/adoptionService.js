const adoptionModel = require('../models/adoptionModel');
const petModel = require('../models/petModel');

const createRequest = async (adoptionData, adopterId) => {
  const { pet_id, application_reason } = adoptionData;

  if (!pet_id || !application_reason) {
    const err = new Error('ID hewan dan alasan adopsi wajib diisi');
    err.statusCode = 400;
    throw err;
  }

  const pet = await petModel.selectById(pet_id);
  if (!pet) {
    const err = new Error('Hewan tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  if (pet.uploader_id === adopterId) {
    const err = new Error('Anda tidak dapat mengajukan adopsi untuk hewan yang Anda posting sendiri');
    err.statusCode = 403;
    throw err;
  }

  if (pet.status !== 'Tersedia') {
    const err = new Error(`Hewan saat ini berstatus '${pet.status}' dan tidak dapat diadopsi`);
    err.statusCode = 400;
    throw err;
  }

  const existingReq = await adoptionModel.checkExistingActiveRequest(pet_id, adopterId);
  if (existingReq) {
    const err = new Error('Anda sudah memiliki pengajuan aktif untuk hewan ini');
    err.statusCode = 409;
    throw err;
  }

  const newRequest = await adoptionModel.insert({
    pet_id,
    adopter_id: adopterId,
    application_reason,
  });

  return newRequest;
};

const updateRequestStatus = async (id, status, uploaderId) => {
  if (!['Diterima', 'Ditolak'].includes(status)) {
    const err = new Error("Status harus berupa 'Diterima' atau 'Ditolak'");
    err.statusCode = 400;
    throw err;
  }

  const request = await adoptionModel.selectById(id);
  if (!request) {
    const err = new Error('Pengajuan adopsi tidak ditemukan');
    err.statusCode = 404;
    throw err;
  }

  if (request.uploader_id !== uploaderId) {
    const err = new Error('Anda tidak memiliki izin untuk merespons pengajuan ini');
    err.statusCode = 403;
    throw err;
  }

  const updatedRequest = await adoptionModel.updateStatus(id, status);

  if (status === 'Diterima') {
    await petModel.updateStatus(request.pet_id, 'Diproses');
  }

  return updatedRequest;
};

module.exports = {
  createRequest,
  updateRequestStatus,
};
