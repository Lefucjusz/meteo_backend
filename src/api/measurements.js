const express = require('express');
const router = express.Router();
const db = require('../db');
const { Op } = require('sequelize');

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

router.get('/getByName/:name', async (req, res) => {
    const requestedSensorName = req.params.name;
    console.log(`[INFO]: [GET] /api/measurements/getByName/${requestedSensorName}`);
    try {
        const maxHumidity = 100; // 100%
        const data = await db.measurement.findAll({
            where: {
                sensorName: requestedSensorName,
                humidity: {
                    [Op.lte]: maxHumidity // Remove errorneous measurements
                }
            }
        });
        res.send(data);
    } catch(err) {
        console.log(`[ERROR]: [GET] /api/measurements/getByName/${requestedSensorName}: ${err}`);
        res.status(500).send('Database error!');
    }
});

module.exports = router;