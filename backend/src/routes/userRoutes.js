const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/:id/pets', userController.getUserPets);
router.get('/me/donations', authenticate, userController.getMyDonations);

module.exports = router;
