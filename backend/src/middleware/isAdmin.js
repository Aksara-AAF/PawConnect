const { error } = require('../utils/responseHelper');

/**
 * Middleware isAdmin
 * Harus digunakan SETELAH middleware authenticate.
 * Membaca req.user.role yang sudah di-set oleh authenticate dari session Redis.
 */
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return error(res, 'Forbidden - Akses hanya untuk Admin', 403);
  }
  next();
};

module.exports = { isAdmin };
