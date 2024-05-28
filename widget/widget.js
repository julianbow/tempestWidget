var map = null;
var selectedFeature = null;
var state = null;
var customOverlays = []; // Array to keep track of custom overlays

$(document).ready(function () {
    loadState();
    attachEventHandlers();
});

function attachEventHandlers() {
    $("#overlay input[type=radio]").on("click", function () {
        let dataId = $(this).data("id");
        console.log("dataId: ", dataId);
        getParameters(dataId);
    });
}

function loadState() {
    const zoom = 9;
    const coords = {
        lat: 29.749907,
        lng: -95.358421,
    };

    initMap(coords, zoom);
}

function initMap(center, zoom) {
    map = new google.maps.Map(document.getElementById("station-map"), {
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

    google.maps.event.addListener(map, "dragend", function () {
        var center = map.getCenter();
        if (!(center.lat() > -80 && center.lat() < 80)) {
            map.panTo(new google.maps.LatLng(
                Math.max(-80, Math.min(80, center.lat())),
                center.lng()
            ));
        }
    });

    google.maps.event.addListener(map, "idle", function () {
        getParameters();
    });
}

function getParameters(paramId) {
    if (paramId === undefined) {
        paramId = 5;
    }

    const urlData = {
        lat_min: map.getBounds().getSouthWest().lat(),
        lat_max: map.getBounds().getNorthEast().lat(),
        lon_min: map.getBounds().getSouthWest().lng(),
        lon_max: map.getBounds().getNorthEast().lng(),
        zoom: map.getZoom(),
        units_wind: "mph",
        units_temp: "f",
        units_precip: "in",
        units_distance: "mi",
        sort: "distance",
        meta_level: "1",
        spot_types: paramId,
        stormprint_only: "false",
        include_nowcast_obs: "false",
        wf_token: "cf7cf3f90b46dde63ce8102fec4613b1",
    }

    $.ajax({
        url: "https://api.weatherflow.com/wxengine/rest/spot/getSpotDetailSetByZoomLevel/",
        method: "GET",
        data: urlData,
        success: function (response) {
			if (response.status.status_code === 0 && response.spots !== null) {
                displayMarkers(response.spots, paramId);
            }
        },
        error: function (error) {
            console.log("ERROR: ", error);
        }
    });
}

function displayMarkers(spots, paramId) {
	console.log("spots: ", spots);
    const styles = {
        1: {
            icon: {
                url: "https://cdn-consumer.weatherflow.com/images/markers/spot/sw-purple@2x.png",
                rotation: 45
            }
        },
        4: {
            icon: null
        },
        5: {
            icon: null
        },
        139: {
            icon: null
        }
    };

    // Clear existing markers and custom overlays
    map.data.forEach(function (feature) {
        map.data.remove(feature);
    });

    customOverlays.forEach(function (overlay) {
        overlay.setMap(null);
    });
    customOverlays = [];

    spots.forEach(function (location) {
        location.stations.forEach(function (station) {
            if (station.provider === 1046 || station.provider === 1047) {
                let param;
				let windDir = null;

                switch (paramId) {
                    case 1:
                        param = Math.ceil(station.data_values[0][2]);
						styles[paramId].icon.rotation = station.data_values[0][5];
                        break;
                    case 4:
                        param = Math.ceil(station.data_values[0][11]);
                        break;
                    case 5:
                        param = Math.ceil(station.data_values[0][7]) + "°";
                        break;
                    case 139:
                        param = Math.ceil(station.data_values[0][15]) + "%";
                        break;
                }

                const latlng = new google.maps.LatLng(location.lat, location.lon);
				console.log(windDir)

                // Create and add a custom overlay for each parameter
                const overlay = new CustomOverlay(latlng, map, styles[paramId] && styles[paramId].icon ? styles[paramId].icon.url : null, styles[paramId] && styles[paramId].icon ? styles[paramId].icon.rotation : 0, param);
                customOverlays.push(overlay);
            }
        });
    });
}