const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { authenticate } = require('../middleware/authMiddleware');
const { cachePets } = require('../middleware/cacheMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', cachePets, petController.getAllPets);
router.get('/:id', petController.getPetById);
router.post('/', authenticate, upload.single('image'), petController.createPet);
router.put('/:id', authenticate, upload.single('image'), petController.updatePet);
router.delete('/:id', authenticate, petController.deletePet);

module.exports = router;
