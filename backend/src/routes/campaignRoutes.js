const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const { authenticate } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public
router.get('/', campaignController.getAllCampaigns);
router.get('/:id', campaignController.getCampaignById);

// Protected – buat campaign baru (single image upload)
router.post('/', authenticate, upload.single('campaign_image'), campaignController.createCampaign);

// Protected – lihat donatur kampanye milik sendiri
router.get('/:id/donations', authenticate, campaignController.getCampaignDonations);

// Protected – hapus campaign milik sendiri
router.delete('/:id', authenticate, campaignController.deleteMyCampaign);

module.exports = router;
