const express = require('express');
const api = require('./api');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db');

app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);

app.post('/', async (req, res) => {
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

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}!`);
});