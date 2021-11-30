const express = require('express');
const api = require('./api');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', api);

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}!`);
});

