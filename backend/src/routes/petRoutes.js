const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { cachePets } = require('../middleware/cacheMiddleware');

// apply caching middlware to the GET / route
router.get('/', cachePets, petController.getAllPets);
router.get('/:id', petController.getPetById);
router.post('/', petController.createPet);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);

module.exports = router;
