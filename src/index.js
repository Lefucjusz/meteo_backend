const express = require('express');
const api = require('./api');
const dbPromise = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('public'));
app.use('/api', api);

app.post('/', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}!`);
});

