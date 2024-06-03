$(document).ready(function() {
    $(".apply-button").click(function() {
        // Get input values
        const mapTitle = $(".map-title").val();
        const mapDate = $(".map-date").val();
        const tempUnits = $(".temp-units").val();
        const windUnits = $(".wind-units").val();
        const presUnits = $(".pres-units").val();
        const state = $(".state").val();
        const mapWidth = $(".map-width").val();
        const mapHeight = $(".map-height").val();
        const mapZoom = $(".map-zoom").val();
        const mapCenter = $(".map-center").text().split(", ");
        const mapCenterLat = mapCenter[0];
        const mapCenterLng = mapCenter[1];

        // Update iframe attributes and src
        let iframe = $("iframe");
        let src = iframe.attr("src");

        // Parse the existing URL parameters and update them with new values
        let newSrc = updateQueryStringParameter(src, "name", mapTitle);
        newSrc = updateQueryStringParameter(newSrc, "time_start", mapDate);
        newSrc = updateQueryStringParameter(newSrc, "units_temp", tempUnits);
        newSrc = updateQueryStringParameter(newSrc, "units_wind", windUnits);
        newSrc = updateQueryStringParameter(newSrc, "units_pres", presUnits);
        newSrc = updateQueryStringParameter(newSrc, "state", state);
        newSrc = updateQueryStringParameter(newSrc, "z", mapZoom);
        newSrc = updateQueryStringParameter(newSrc, "lat", mapCenterLat);
        newSrc = updateQueryStringParameter(newSrc, "lng", mapCenterLng);

        iframe.attr("src", newSrc);
        iframe.attr("width", mapWidth);
        iframe.attr("height", mapHeight);

        // Update the code in the textarea
        const iframeCode = '<iframe src="' + newSrc + '" width="' + mapWidth + '" height="' + mapHeight + '" frameborder="0" scrolling="no" allowtransparency="no"></iframe>';
        $("#widget-code textarea").val(iframeCode);
    });

    function updateQueryStringParameter(uri, key, value) {
        let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        let separator = uri.indexOf('?') !== -1 ? "&" : "?";

        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }

    window.addEventListener("message", function(event) {
        var data = event.data;

        if (data.type === "mapInfo") {
            var zoomLevel = data.zoom;
            var center = data.center;
            var centerText = center.lat + ", " + center.lng;
            $(".map-center").text(centerText);
            $(".map-zoom").val(zoomLevel);
            $(".map-zoom").text(zoomLevel);
        }
    });
});