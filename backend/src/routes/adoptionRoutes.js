const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, adoptionController.createRequest);
router.patch('/:id', authenticate, adoptionController.updateRequestStatus);

module.exports = router;
