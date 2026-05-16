const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/isAdmin');

// Semua route admin wajib login DAN berstatus admin
router.get('/campaigns/pending', authenticate, isAdmin, adminController.getPendingCampaigns);
router.patch('/campaigns/:id/verify', authenticate, isAdmin, adminController.verifyCampaign);
router.delete('/campaigns/:id', authenticate, isAdmin, adminController.rejectCampaign);

router.get('/shelters/pending', authenticate, isAdmin, adminController.getPendingShelters);
router.patch('/shelters/:id/verify', authenticate, isAdmin, adminController.verifyShelter);

module.exports = router;
