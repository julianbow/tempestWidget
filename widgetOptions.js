$(document).ready(function() {
    flatpickr(".map-date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        defaultDate: new Date()
    });

    attachEventHandlers();
    initIFrame();
});

function attachEventHandlers() {
    $(".apply-button").click(function() {
        initIFrame();
    });

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
}

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

function timeFormatter(timeStart) {
    // Format time_end correctly
    let timeEnd = new Date(timeStart);
    let year = timeEnd.getFullYear();
    let month = String(timeEnd.getMonth() + 1).padStart(2, '0');
    let day = String(timeEnd.getDate()).padStart(2, '0');
    let hours = String(timeEnd.getHours()).padStart(2, '0');
    let minutes = String(timeEnd.getMinutes()).padStart(2, '0');
    let timeEndString = `${year}-${month}-${day}+${hours}:${minutes}:00`;

    return timeEndString;
}

function initIFrame() {
       // Get input values
       let mapDate = $(".map-date").val();
       const mapTitle = $(".map-title").val();
       const tempUnits = $(".temp-units").val();
       const windUnits = $(".wind-units").val();
       const presUnits = $(".pres-units").val();
       const state = $(".state").val();
       const mapWidth = $(".map-width").val();
       const mapHeight = $(".map-height").val();
       const mapZoom = $(".map-zoom").text();
       const mapCenter = $(".map-center").text().split(", ");
       const mapCenterLat = mapCenter[0];
       const mapCenterLng = mapCenter[1];

       mapDate = mapDate.replace(" ", "+");
       mapDate += ":00";

       // Calculate time_end as 5 minutes after time_start
       let timeStart = new Date(mapDate.replace("+", "T"));
       timeStart.setMinutes(timeStart.getMinutes() + 5);

       let timeEndString = timeFormatter(timeStart);

       // Update iframe attributes and src
       let iframe = $("iframe");
       let src = iframe.attr("src");

       // Parse the existing URL parameters and update them with new values
       let newSrc = updateQueryStringParameter(src, "name", mapTitle);
       newSrc = updateQueryStringParameter(newSrc, "time_start", mapDate);
       newSrc = updateQueryStringParameter(newSrc, "time_end", timeEndString);
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
}