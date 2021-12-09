const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/full', async (req, res) => {
    const data = req.body;
    if(
        !data || 
        (typeof(data.name) !== 'string') || 
        (typeof(data.To) !== 'string') || 
        (typeof(data.Ti) !== 'string') || 
        (typeof(data.P) !== 'string') || 
        (typeof(data.RH) !== 'string')
    ) {
        console.log(`[ERROR]: [POST] /api/sensors/full: malformed JSON!`);
        res.status(400).send('Malformed JSON!');
        return;
    }

    const tempInside = parseInt(data.Ti);
    const tempOutside = parseInt(data.To);
    const pressure = parseInt(data.P);
    const humidity = parseInt(data.RH);

    if(isNaN(tempInside) || isNaN(tempOutside) || isNaN(pressure) || isNaN(humidity)) {
        console.log(`[ERROR]: [POST] /api/sensors/full: received NaN!`);
        res.status(400).send('Received NaN!');
        return;
    }

    try {
        await db.measurement.create({
            sensorName: data.name,
            tempInside: tempInside,
            tempOutside: tempOutside,
            pressure: pressure,
            humidity: humidity,
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
        (typeof(data.To) !== 'string') || 
        (typeof(data.Ti) !== 'string')
    ) {
        console.log(`[ERROR]: [POST] /api/sensors/temp: malformed JSON!`);
        res.status(400).send('Malformed JSON!');
        return;
    }

    const tempInside = parseInt(data.Ti);
    const tempOutside = parseInt(data.To);

    if(isNaN(tempInside) || isNaN(tempOutside)) {
        console.log(`[ERROR]: [POST] /api/sensors/temp: received NaN!`);
        res.status(400).send('Received NaN!');
        return;
    }

    try {
        await db.measurement.create({
            sensorName: data.name,
            tempInside: tempInside,
            tempOutside: tempOutside,
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