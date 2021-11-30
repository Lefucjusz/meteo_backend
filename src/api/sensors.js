const express = require('express');
const dbPromise = require('../db');
const router = express.Router();

router.post('/fullMeas', async (req, res) => {
    const db = await dbPromise;
    const data = req.body;
    if(!data || !data.name || !data.to || !data.ti || !data.p || !data.h) {
        console.log(`[ERROR] api.sensors.fullMeas: malformed JSON!`);
        res.status(400).send('Malformed JSON!');
        return;
    }

    try {
        const sqlStatement = `
            INSERT INTO measurements
            (sensor_name, temp_outside, temp_inside, humidity, pressure)
            VALUES (?,?,?,?,?);
        `;
        await db.run(sqlStatement, data.name, data.to, data.ti, data.h, data.p);
        console.log('[INFO] api.sensors.fullMeas: new measurement received!');
        res.send('OK');
    } catch(err) {
        console.log(`[ERROR] api.sensors.fullMeas: ${err}!`);
        res.status(500).send('Database error!');
    }
});


router.post('/tempMeas', async (req, res) => {
    const db = await dbPromise;
    const data = req.body;
    if(!data || !data.name || !data.to || !data.ti) {
        console.log(`[ERROR] api.sensors.tempMeas: ${err}!`);
        res.status(400).send('Malformed JSON data!');
    }

    try {
        const sqlStatement = `
            INSERT INTO measurements
            (sensor_name, temp_outside, temp_inside)
            VALUES (?,?,?);
        `;
        await db.run(sqlStatement, data.name, data.to, data.ti);
        console.log('[INFO] api.sensors.tempMeas: new measurement received!');
        res.send('OK');
    } catch(err) {
        console.log(`[ERROR] api.sensors.post.tempMeas: ${err}!`);
        res.status(500).send('Database error!');
    }
});

module.exports = router;