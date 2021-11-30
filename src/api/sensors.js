const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/fullMeas', async (req, res) => {
    const data = req.body;
    if(!data || !data.name || !data.to || !data.ti || !data.p || !data.h) {
        console.log(`[ERROR] api.sensors.post.fullMeas: ${err}!`);
        res.status(400).send('Malformed JSON data!');
    }

    try {
        const sqlStatement = `
            INSERT INTO measurements
            (sensor_name, temp_inside, temp_outside, humidity, pressure)
            VALUES 
            (${data.name}, ${data.to}, ${data.ti}, ${data.p}, ${data.h});
        `;
        await db.run(sqlStatement);
        res.send('OK');
    } catch(err) {
        console.log(`[ERROR] api.sensors.post.fullMeas: ${err}!`);
        res.status(500).send('Database error!');
    }
});


router.post('/tempMeas', async (req, res) => {
    const data = req.body;
    if(!data || !data.name || !data.to || !data.ti) {
        res.status(400).send('Malformed JSON data!');
    }

    try {
        const sqlStatement = `
            INSERT INTO measurements
            (sensor_name, temp_inside, temp_outside)
            VALUES 
            (${data.name}, ${data.to}, ${data.ti});
        `;
        await db.run(sqlStatement);
        res.send('OK');
    } catch(err) {
        console.log(`[ERROR] api.sensors.post.tempMeas: ${err}!`);
        res.status(500).send('Database error!');
    }
});

module.exports = router;