var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

d3.json(url).then((earthquakeData) => {
    console.log(earthquakeData)
})


// creating the map
var map = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

var myMap = L.map("map", {
    center: [
      37.09, -95.71
      ],
    zoom: 2,
    layers: [map]
});

earthquakes =[]

for (var i = 0; i < earthquakeData.length; i++) {
    // loop through the earthquak array, create a new marker, push it to the cityMarkers array
    cityMarkers.push(
      L.marker(earthquakeData[i].location).bindPopup("<h1>" + cities[i].name + "</h1>")
    );
  }