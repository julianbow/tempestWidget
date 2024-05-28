const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const Map = require('./Map.js');

const map = new Map();

app.use('/widget', express.static(path.join(__dirname, '..', 'widget')));
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(5502, () => {
    console.log('Server is running on http://127.0.0.1:5502');
});

const log = console;

app.get('/tempestMap', async (req, res) => {
    log.debug(">> Enter tempestMap");
    const startTime = Date.now();

    try {
        widgetCode = map.getMap();
        console.log(widgetCode);

        // Special Logging
        log.info(`windMap,${Date.now() - startTime},${req.method},${JSON.stringify(req.query)}`);
        log.debug("<< Exit tempestMap");

        res.status(200).type('text/html').send(widgetCode);
    } catch (e) {
        log.error(`Error in REST Resource - tempestMap - message = ${e.message}`);
        e.stack && log.error(e.stack);

        res.status(500).send('Internal Server Error');
    }
});