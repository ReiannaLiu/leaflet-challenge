// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map with our layers.
let map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12
});

// Add our "streetmap" tile layer to the map.
streetmap.addTo(map);
