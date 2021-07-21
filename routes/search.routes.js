const { Router } = require('express');
const { check } = require('express-validator');
const { search } = require('../controllers/searchController');

const router = Router();

// Routes
router.get('/:collection/:term', search);

module.exports = router;