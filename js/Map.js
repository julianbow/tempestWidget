class Map {
    constructor() {
        this.html = "";
		this.center = null;
		this.zoom = null;
		this.unitsWind = null;
		this.unitsTemp = null;
		this.unitsPressure = null;
		this.username = null;
        this.state = null;
        this.timeStart = null;
        this.timeEnd = null;
        this.timeStep = null;
    };
    _initHtml() {
        this.html = `
            <div id="widget-ctn">
                <div id="widget-header">${this.username}</div>
                <div id="station-map"></div>
                <div id="menu">
                    <div id="menu-toggle">
                        Options
                        <span class="arrow">&#9662;</span>
                    </div>
                    <div id="menu-options">
                        <div class="toggle">
                            <h3 id="temp">Temp (${this.unitsTemp})</h3>
                            <span class="slider" data-id="5"></span>
                        </div>
                        <div class="toggle">
                            <h3 id="wind">Wind (${this.unitsWind})</h3>
                            <span class="slider" data-id="1"></span>
                        </div>
                        <div class="toggle">
                            <h3 id="pressure">Pressure (mb)</h3>
                            <span class="slider" data-id="4"></span>
                        </div>
                        <div class="toggle">
                            <h3 id="humidity">Humidity</h3>
                            <span class="slider" data-id="139"></span>
                        </div>
                    </div>
                </div>
                <div id="widget-footer"><img src="/css/images/tempest-logo.svg" class="tempest-logo"></div>
            </div>

            <a href="https://shop.tempest.earth/products/tempest" target="_blank"><div id="widget-footer"><img src="/css/images/tempest-logo.svg" class="tempest-logo"></img></div></a>
            <link rel='stylesheet' type='text/css' href="/css/index.css"></link>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
            <script>
                window.jQuery || document.write('<script src="https://d291gtx2rbpaxo.cloudfront.net/lib/jquery/2.2.4/jquery.min.js"><script>');
            </script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCR5mSKiNcVMK29BzuTCQojuFGszWctao&callback=Function.prototype"></script>
            <script>
                window.widgetParams = {
                    lat: ${this.center.lat},
                    lon: ${this.center.lng},
                    zoom: ${this.zoom},
                    unitsWind: "${this.unitsWind}",
                    unitsTemp: "${this.unitsTemp}",
                    unitsPressure: "${this.unitsPressure}",
                    state: "${this.state}",
                    timeStart: "${this.timeStart}",
                    timeEnd: "${this.timeEnd}",
                    timeStep: "${this.timeStep}",
                };

                window.config = {
                    wftoken: "${this.token}"
                };
            </script>
            <script type="text/javascript" src="/widget/CustomOverlay.js"></script>
            <script type="text/javascript" src="/widget/MapController.js"></script>
        `;
    };

    getMap() {
        this._initHtml();
        return this.html;
    };

    setCenter(center) {
        this.center = center;
    };

    setZoom(zoom) {
        this.zoom = zoom;
    };

    setSort(sort) {
        this.sort = sort;
    };

    setUnitsWind(unitsWind) {
        this.unitsWind = unitsWind;
    };

    setUnitsTemp(unitsTemp) {
        this.unitsTemp = unitsTemp;
    };

    setUnitsPressure(unitsPressure) {
        this.unitsPressure = unitsPressure;
    };

    setUserName(username) {
        this.username = username;
    };

    setState(state) {
        this.state = state;
    };

    setToken(token) {
        this.token = token;
    };

    setTimeStart(timeStart) {
        this.timeStart = timeStart;
    };

    setTimeEnd(timeEnd) {
        this.timeEnd = timeEnd;
    };

    setTimeStep(timeStep) {
        this.timeStep = timeStep;
    };
};

module.exports = Map;