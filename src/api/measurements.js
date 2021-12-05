const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getAll', async (req, res) => {
    console.log('[INFO]: [GET] /api/measurements/getAll');
    try {
        const data = await db.measurement.findAll();
        res.send(data);
    } catch(err) {
        console.log(`[ERROR]: [GET] /api/measurements/getAll: ${err}`);
        res.status(500).send('Database error!');
    }
});

module.exports = router;