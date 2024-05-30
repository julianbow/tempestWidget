const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const Map = require('./public/js/Map');
const config = require("./config.json");
const WFTOKEN = config.wf_token;

const map = new Map();

app.use(express.static(path.join(__dirname, 'public')));
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
        map.setZoom(req.query.z);
        map.setCenter({lat: req.query.lat, lng: req.query.lng});
        map.setUnitsWind(req.query.units_wind);
        map.setUnitsTemp(req.query.units_temp);
        map.setUnitsPressure(req.query.units_pres);
        map.setSort(req.query.sort);
        map.setUserName(req.query.name);
        map.setState(req.query.state);
        map.setTimeStart(req.query.time_start);
        map.setTimeEnd(req.query.time_end);


        map.setToken(WFTOKEN);

        widgetCode = map.getMap();

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