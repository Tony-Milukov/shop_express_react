const express = require('express');

const router = express.Router();

const { updateRating, getRating } = require('../controllers/ratingController.ts');

router.put('/', updateRating);
router.get('/:productId', getRating);
module.exports = router;
export {};
