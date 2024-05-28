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
            <div id="overlay">
            <input type="radio" id="temp" name="option" value="Temp (F)" data-id="5" checked>
            <label for="temp">Temp (F)</label>
            <input type="radio" id="wind" name="option" value="Wind (mph)" data-id="1">
            <label for="wind">Wind (mph)</label>
            <input type="radio" id="pressure" name="option" value="Pressure (inHG)" data-id="4">
            <label for="pressure">Pressure (inHG)</label>
            <input type="radio" id="humidity" name="option" value="Humidity" data-id="139">
            <label for="humidity">Humidity</label>
        </div>
            <div id="widget-footer"><img src="/css/images/tempest-logo.svg" class="tempest-logo"></img></div>
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

