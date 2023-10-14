
let map = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4
});

// Create the tile layer that will be the background of our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Perform an API call to the earthquakes information endpoint.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function (data) {

    function getColor(depth) {
        if (depth > 90) {
            return "#4B0082";  // Indigo
        } else if (depth > 70) {
            return "#8B0000";  // Dark Red
        } else if (depth > 50) {
            return "#FF4500";  // OrangeRed
        } else if (depth > 30) {
            return "#FFA500";  // Orange
        } else if (depth > 10) {
            return "#FFD700";  // Gold
        } else {
            return "#FFFFE0";  // Light Yellow
        }
    }

    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 15000;
    }

    data.features.forEach(feature => {
        let coordinates = feature.geometry.coordinates;
        let magnitude = feature.properties.mag;
        let depth = coordinates[2];
        let place = feature.properties.place;

        L.circle([coordinates[1], coordinates[0]], {
            fillOpacity: 0.75,
            color: getColor(depth),
            fillColor: getColor(depth),
            radius: getRadius(magnitude)
        }).bindPopup(`<h3>${place}</h3><hr><p>Magnitude: ${magnitude}<br>Depth: ${depth} km</p>`)
            .addTo(map);
    });

    // Create a legend to display information about our map.
    let legend = L.control({
        position: "bottomright"
    });

    // When the layer control is added, insert a div with the class of "legend".
    legend.onAdd = function (map) {
        let div = L.DomUtil.create("div", "legend");
        let depths = [-10, 10, 30, 50, 70, 90];
        let labels = [];

        // Loop through our depth intervals and generate a label with a colored square for each interval
        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(depths[i] + 1) + '; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7;"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] : '+') + '<br><br>';
        }

        return div;
    };

    // Add the legend to the map.
    legend.addTo(map);

});