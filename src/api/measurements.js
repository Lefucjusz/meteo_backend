const express = require('express');
const router = express.Router();
const dbPromise = require('../db');

router.get('/getAll', async (req, res) => {
    const db = await dbPromise;
    try {
        const data = await db.all('SELECT * FROM measurements');
        console.log(`[INFO] api.measurements.getAll: new request received!`);
        res.send(data);
    } catch(err) {
        console.log(`[ERROR] api.measurements.getAll: ${err}!`);
        res.status(500).send('Database error!');
    }
});


module.exports = router;