const url = "../static/statesData.geojson";
console.log("squid");

const Map = L.map("map", {
    center: [1, 10],
    zoom: 3
});

function chooseColor(depth) {
    if (depth < 10) {
        return "yellow";
    }
    else if (depth >= 10 && depth < 30) {
        return "green";
    }
    
    else if (depth >= 30 && depth < 50) {
        return "orange";
    }
    
    else if (depth >= 50 && depth < 70) {
        return "red";
    }
    
    else if (depth >= 70 && depth < 90) {
        return "magenta";
    }

    else {
        return "purple";
    }
    }

function chooseSize(mag) {
    return mag * 3;
    };
    

d3.json(url, function(d) {
    L.geoJson(d, {
        pointToLayer: function(feature, latlng) {
            return new L.CircleMarker(latlng, {
            radius: chooseSize(feature.properties.mag),
            color: chooseColor(feature.geometry.coordinates[2])
            });
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<h1>Magnitude: '+feature.properties.mag+'<br>Location: '+feature.properties.place+'</h1>');
            }
    }).addTo(Map);
});

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 450,
    maxZoom: 10,
    zoomOffset: -1,      
    id: "streets-v11",
    accessToken: API_KEY
    }).addTo(Map);


var legend = L.control({position: 'bottomleft'});

legend.onAdd = function() {
const div = L.DomUtil.create("div", "info legend");

const grades = [0, 1, 2, 3, 4, 5];
const colors = [
    "yellow",
    "green",
    "orange",
    "red",
    "magenta",
    "purple"
];

for (let i = 0; i < grades.length; i++) {
    div.innerHTML +=
    "<i style='background: " + colors[i] + "'></i> " +
    grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
}
return div;
};

legend.addTo(map);

