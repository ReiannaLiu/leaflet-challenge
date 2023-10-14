// Base Maps Definitions
let satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

let grayscale = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
});

let outdoors = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

let baseMaps = {
    "Satellite": satellite,
    "Grayscale": grayscale,
    "Outdoors": outdoors
};

// Map Initialization
let map = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4,
    layers: [satellite]
});

// Layer Groups Initialization
let earthquakes = L.layerGroup().addTo(map);
let tectonicPlates = L.layerGroup().addTo(map);

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

function earthquakeStyle(feature) {
    return {
        fillOpacity: 0.75,
        color: getColor(feature.geometry.coordinates[2]),
        fillColor: getColor(feature.geometry.coordinates[2]),
        radius: getRadius(feature.properties.mag)
    };
}
// Perform an API call to the earthquakes information endpoint.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, earthquakeStyle(feature));
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]} km</p>`);
        }
    }).addTo(earthquakes);

    // Load Tectonic Plates Data
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (platesData) {
        L.geoJSON(platesData, {
            color: "orange",
            weight: 2,
            fill: false
        }).addTo(tectonicPlates);

        // Overlay Maps Definitions
        let overlayMaps = {
            "Earthquakes": earthquakes,
            "Tectonic Plates": tectonicPlates
        };

        // Layer Control
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(map);
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

