const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const campaignController = require('../controllers/campaignController');
const { authenticate } = require('../middleware/authMiddleware');

// Routes with /me/* must be declared BEFORE /:id/* to avoid route conflicts
router.get('/me/pets', authenticate, userController.getMyPets);
router.get('/me/requests', authenticate, userController.getMyRequests);
router.get('/me/incoming', authenticate, userController.getIncomingRequests);
router.get('/me/donations', authenticate, userController.getMyDonations);
router.get('/me/campaigns', authenticate, campaignController.getMyCampaigns);
router.post('/me/apply-shelter', authenticate, userController.applyShelter);

router.get('/:id/pets', userController.getUserPets);

module.exports = router;
