// This will be the base file for our choropleth maps
// Creating map object
let myMap = L.map("map", {
  center: [39.0997, -94.5786],
  zoom: 8
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// ToDo: add our own geojson data file
// Load in geojson data
let geoData = [{'Alabama': {
  'average high': {
    'apr': 77.0,
    'aug': 92.0,
    'dec': 60.0,
    'feb': 62.0,
    'jan': 57.0,
    'jul': 92.0,
    'jun': 90.0,
    'mar': 70.0,
    'may': 84.0,
    'nov': 69.0,
    'oct': 78.0,
    'sep': 87.0
  },
  'average low': {
    'apr': 52.0,
    'aug': 71.0,
    'dec': 37.0,
    'feb': 39.0,
    'jan': 36.0,
    'jul': 71.0,
    'jun': 68.0,
    'mar': 45.0,
    'may': 61.0,
    'nov': 44.0,
    'oct': 53.0,
    'sep': 65.0
  },
  'average rain': {
    'apr': 4.02,
    'aug': 3.96,
    'dec': 4.86,
    'feb': 5.28,
    'jan': 4.65,
    'jul': 5.24,
    'jun': 4.07,
    'mar': 5.95,
    'may': 3.54,
    'nov': 4.61,
    'oct': 2.92,
    'sep': 3.97
  },
  'capital': 'montgomery'
  }
}];
console.log(geoData)
let geojson;

// Grab data with d3
d3.json(geoData, function(data) {
  console.log(data);

  // Create a new choropleth layer
  geojson = L.choropleth(data, {
    // Define what property in the features to use
    valueProperty: "Black_Pct",

    // Set color scale
    scale: ["white", "blue"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "black",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Zip Code: " + feature.properties.ZIP + "<br>Percentage of African Americans:<br>" +
        feature.properties.Black_Pct + "%");
    }
  }).addTo(myMap);

  // Set up the legend
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits = geojson.options.limits;
    console.log(limits);
    let colors = geojson.options.colors;
    let labels = [];

    // Add min & max
    let legendInfo = "<h1>Percentage of African Americans</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

});
