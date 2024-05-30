class MapController {
    constructor() {
        this.map = null;
        this.state = null;
        this.customOverlays = [];

		this.lat = null;
		this.lon = null;
		this.zoom = null;
		this.unitsWind = null;
		this.unitsTemp = null;
		this.unitsPressure = null;
		this.state = null;
        this.timeStart = null;
        this.timeEnd = null;
        this.timeStep = null;

        this.accessToken = null;

		this.paramIds = {
			"wind": 1,
			"pressure": 4,
			"temp": 5,
			"humidity": 139
		}

        $(document).ready(() => {
			this.loadParameters();
            this.attachEventHandlers();
        });
    };

    attachEventHandlers() {
        $("#menu .slider").on("click", (event) => {
            const dataId = $(event.target).data("id");
            this.getParameters(dataId);
        });

        $("#menu-toggle").on("click", () => {
            if ($("#menu").hasClass("expanded")) {
                $("#menu").removeClass("expanded");
            } else {
                $("#menu").addClass("expanded");
            }
        });

        $("#menu-options .toggle .slider").on("click", (event) => {
            const dataId = $(event.target).data('id');

            $(".slider").removeClass('checked');
            $("#menu-options").removeClass('checked');

            $(event.target).addClass('checked');
            $('#' + dataId).addClass('checked');
        });
    };

	loadParameters() {
        const params = window.widgetParams;

        if (params) {
            this.lat = params.lat;
			this.lon = params.lon;
            this.zoom = params.zoom;
            this.unitsWind = params.unitsWind;
            this.unitsTemp = params.unitsTemp;
            this.unitsPressure = params.unitsPressure;
			this.state = params.state;
            this.accessToken = window.config.wftoken;
            this.timeStart = params.timeStart;
            this.timeEnd = params.timeEnd;
            this.timeStep = params.timeStep;
        }

		this.checkAndSetMenuOptions();
		this.loadState();
    };

	checkAndSetMenuOptions() {
        $("#menu-options .toggle .slider").each((index, element) => {
            const dataId = $(element).data("id");

            if (this.paramIds[this.state] === dataId) {
                $(element).addClass("checked");
            }
        });
    };

    loadState() {
		const zoom = this.zoom != null ? this.zoom : 3;
		const coords = {
			lat: this.lat != null ? this.lat : 28.3689,
			lng: this.lon != null ? this.lon : -32.1426,
		};

        this.initMap(coords, zoom);
    };

    initMap(center, zoom) {
        this.map = new google.maps.Map(document.getElementById("station-map"), {
            zoom: zoom,
            minZoom: 4,
            center: center,
            zoomControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            panControl: false,
            rotateControl: false,
            keyboardShortcuts: false,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ],
            tilt: 0
        });

        google.maps.event.addListener(this.map, "dragend", () => {
            var center = this.map.getCenter();
            if (!(center.lat() > -80 && center.lat() < 80)) {
                this.map.panTo(new google.maps.LatLng(
                    Math.max(-80, Math.min(80, center.lat())),
                    center.lng()
                ));
            }
        });

        google.maps.event.addListener(this.map, "idle", () => {
            const dataId = $(".slider.checked").data("id");
            this.getParameters(dataId);
        });
    };

    getParameters(paramId) {
        const urlData = {
            lat_min: this.map.getBounds().getSouthWest().lat(),
            lat_max: this.map.getBounds().getNorthEast().lat(),
            lon_min: this.map.getBounds().getSouthWest().lng(),
            lon_max: this.map.getBounds().getNorthEast().lng(),
            zoom: this.map.getZoom(),
            units_wind: this.unitsWind,
            units_temp: this.unitsTemp,
            time_start: this.timeStart,
            time_end: this.timeEnd,
            time_step: this.timeStep,
            units_distance: "mi",
            sort: "distance",
            meta_level: "1",
            spot_types: paramId,
            stormprint_only: "false",
            include_nowcast_obs: "false",
            wf_token: this.accessToken,
        }

        $.ajax({
            url: "https://api.weatherflow.com/wxengine/rest/spot/getSpotDetailSetByZoomLevel/",
            method: "GET",
            data: urlData,
            success: (response) => {
                if (response.status.status_code === 0 && response.spots !== null) {
                    this.displayMarkers(response.spots, paramId);
                }
            },
            error: function (error) {
                console.log("ERROR: ", error);
            }
        });
    };

    displayMarkers(spots, paramId) {
        const params = {
            1: {
				param: null,
                icon: {
                    url: "https://cdn-consumer.weatherflow.com/images/markers/spot/sw-purple@2x.png",
                    rotation: 45
                }
            },
            4: {
				param: null,
                icon: null
            },
            5: {
				param: null,
                icon: null
            },
            139: {
				param: null,
                icon: null
            }
        };

        // Clear existing markers and custom overlays
        this.map.data.forEach((feature) => {
            this.map.data.remove(feature);
        });

        this.customOverlays.forEach((overlay) => {
            overlay.setMap(null);
        });

        this.customOverlays = [];

        spots.forEach((location) => {
            location.stations.forEach((station) => {
                if (station.provider === 1046 || station.provider === 1047) {
                    switch (paramId) {
                        case 1:
                            if (station.data_values[0][2] === null) {
                                params[paramId].param = null;
                            } else {
                                params[paramId].param = Math.ceil(station.data_values[0][2]);
                                params[paramId].icon.rotation = station.data_values[0][5];
                            }
                            break;
                        case 4:
                            if (station.data_values[0][11] === null) {
                                params[paramId].param = null;
                            } else {
                                params[paramId].param = Math.ceil(station.data_values[0][11]);
                            }
                            break;
                        case 5:
                            if (station.data_values[0][7] === null) {
                                params[paramId].param = null;
                            } else {
                                params[paramId].param = Math.ceil(station.data_values[0][7]) + "°";
                            }
                            break;
                        case 139:
                            if (station.data_values[0][15] === null) {
                                params[paramId].param = null;
                            } else {
                                params[paramId].param = Math.ceil(station.data_values[0][15]) + "%";
                            }
                            break;
                    }

                    const latlng = new google.maps.LatLng(location.lat, location.lon);

                    if (params[paramId].param !== null) {
                        // Create and add a custom overlay for each parameter
                        const overlay = new CustomOverlay(latlng, this.map, params[paramId] && params[paramId].icon ? params[paramId].icon.url : null, params[paramId] && params[paramId].icon ? params[paramId].icon.rotation : 0, params[paramId].param);
                        this.customOverlays.push(overlay);
                    }
                }
            });
        });
    };
};

// Instantiate the MapController class
const mapController = new MapController();