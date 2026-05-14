const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');

router.post('/', adoptionController.createRequest);
router.patch('/:id', adoptionController.updateRequestStatus);

module.exports = router;
