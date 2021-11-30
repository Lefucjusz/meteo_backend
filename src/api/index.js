const express = require('express');
const router = express.Router();

const sensors = require('./sensors');
const measurements = require('./measurements');

router.use('/sensors', sensors);
router.use('/measurements', measurements);

module.exports = router;