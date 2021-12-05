const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/full', async (req, res) => {
    const data = req.body;
    if(
        !data || 
        (typeof(data.name) !== 'string') || 
        (typeof(data.To) !== 'number') || 
        (typeof(data.Ti) !== 'number') || 
        (typeof(data.P) !== 'number') || 
        (typeof(data.RH) !== 'number')
    ) {
        console.log(`[ERROR]: [POST] /api/sensors/full: malformed JSON!`);
        res.status(400).send('Malformed JSON!');
        return;
    }

    try {
        await db.measurement.create({
            sensorName: data.name,
            tempInside: data.Ti,
            tempOutside: data.To,
            pressure: data.P,
            humidity: data.RH,
            timestamp: Math.round(Date.now()/1000)
        });
        
        console.log('[INFO]: [POST] /api/sensors/full: new measurement received!');
        res.send('OK');
    } catch(err) {
        console.log(`[ERROR]: [POST] /api/sensors/full: ${err}!`);
        res.status(500).send('Database error!');
    }
});


router.post('/temp', async (req, res) => {
    const data = req.body;
    if(
        !data || 
        (typeof(data.name) !== 'string') || 
        (typeof(data.To) !== 'number') || 
        (typeof(data.Ti) !== 'number')
    ) {
        console.log(`[ERROR]: [POST] /api/sensors/temp: malformed JSON!`);
        res.status(400).send('Malformed JSON!');
        return;
    }

    try {
        await db.measurement.create({
            sensorName: data.name,
            tempInside: data.Ti,
            tempOutside: data.To,
            pressure: null,
            humidity: null,
            timestamp: Math.round(Date.now()/1000)
        });
        
        console.log('[INFO]: [POST] /api/sensors/temp: new measurement received!');
        res.send('OK');
    } catch(err) {
        console.log(`[ERROR]: [POST] /api/sensors/temp: ${err}!`);
        res.status(500).send('Database error!');
    }
});

module.exports = router;