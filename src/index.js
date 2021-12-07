const express = require('express');
const api = require('./api');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}!`);
});