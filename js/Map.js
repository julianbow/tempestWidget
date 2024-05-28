class Map {
    constructor() {
        this.str = "";

        this._initMap();
    };
    _initMap() {
        this.str = `
            <div id="widget-ctn">
                <div id="widget-header">KHOU</div>
                <div id="station-map"></div>
                <div id="menu">
                    <div id="menu-toggle">
                        Options
                        <span class="arrow">&#9662;</span>
                    </div>
                    <div id="menu-options">
                        <div class="toggle">
                            <h3 id="temp">Temp (F)</h3>
                            <span class="slider checked" data-id="5"></span>
                        </div>
                        <div class="toggle">
                            <h3 id="wind">Wind (mph)</h3>
                            <span class="slider" data-id="1"></span>
                        </div>
                        <div class="toggle">
                            <h3 id="pressure">Pressure (inHG)</h3>
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
            <script type="text/javascript" src="/widget/CustomOverlay.js"></script>
            <script type="text/javascript" src="/widget/widget.js"></script>
        `;
    };
    getMap() {

        return this.str;
    };
};

module.exports = Map;

