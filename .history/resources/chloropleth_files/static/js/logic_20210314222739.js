let map = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    titleSize: 600,
    maxZoom: 10,
    zoomOffset: 0,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

let myMap = L.map("map", {
    center: [39.0997,-94.5786], //**KC, MO**//
    zoom: 4,
});

map.addTo(myMap);

const data2 = "static/data/masterdata.geojson";
d3.json(data2, d =>{
    // let pop = feature.properties.Population;
    // console.log(pop);
    L.geoJson(d, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: chooseStyle,

        onEachFeature: function(feature, layer) {
            layer.bindPopup("<div class=header><b><u>State Name: </u></b>" + feature.properties.state + "</div><b>Capital: </b>" + feature.properties.Capital + "<br> <b>State Population: </b>" + feature.properties.Population + "<br> <b>Median Age: </b>" + feature.properties["Median Age"] + "<br> <b>Household Income: </b>" + feature.properties["Household Income"] + "<br> <b>Poverty Count: </b>" + feature.properties["Poverty Count"] + "<br> <b>Poverty Rate %: </b>" + feature.properties["Poverty Rate"]);
        }
    }).addTo(myMap);

    function chooseStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: chooseColor(feature.properties.Population),
            color: chooseColor(feature.geometry.Population),
            radius: chooseSize(feature.properties.density),
            stroke: true,
            weight: .5
        };
    }

    function chooseSize(density) {
        return density / 3;
    };

    function chooseColor(Population) {
        switch(true) {
            case Population > 39283497:
                return "#F00505";
            case Population > 32803394:
                return "#FF2C05";
            case Population > 6480102:
                return "#FD6104";
            case Population > 5899078:
                return "#FD9A01";
            case Population > 581024:
                return "#FFCE03";
            default:
                return "#FEF001";
            }
    }

    let legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "legend");

        let intensity = [0,"581,024","5,899,078","6,480,102","32,803,394","39,283,497"];
        let colors = ["#FEF001", "#FFCE03", "#FD9A01", "#FD6104", "#FF2C05", "#F00505"];

        let legendInfo = "<h4><u>LEGEND:</u></h4>"
        div.innerHTML = legendInfo 
        for (let i = 0; i < colors.length; i++) {
            div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            intensity[i] + (intensity[i + 1] ? " - " + intensity[i + 1] + " Population <br>" : "+ Population");
        }
        return div;

    };
    legend.addTo(myMap);
});
// DELETE OR COMMENT OUT BELOW ITEMS IF WE CANNOT GET THEM TO WORK //
const data = "static/data/statesData.geojson";

let geojson;

d3.json(data, d => {
    geojson = L.choropleth(d, {
            // Define what  property in the features to use
    valueProperty: "density",

    // Set color scale
    scale: ["white", "#8B898C"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
    // Border color
    color: "#8B898C",
    weight: 1,
    fillOpacity: 0.8
    },
}).addTo(myMap);
});