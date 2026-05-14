const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, donationController.createDonation);
router.patch('/:id/confirm', authenticate, donationController.confirmDonation);

module.exports = router;