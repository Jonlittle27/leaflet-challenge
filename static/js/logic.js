var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then((earthquakeData) => {
    console.log(earthquakeData)
})

// Perform a GET request to the query URL
d3.json(url).then((earthquakeData) => {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(earthquakeData.features);
});

function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    function onEachLayer (feature) {
      return new L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        fillOpacity: .7,
        color: markerColor(feature.properties.mag),
        fillColor: markerColor(feature.properties.mag),
        radius: markerSize(feature.properties.mag)
      });
    }
    // Give each feature a popup describing the place, mag, and time of the earthquake
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
        "<p>" + "Magnitude of " + feature.properties.mag + "</p>");
      
            
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: onEachLayer
    });
  
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define streetmap and darkmap layers
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
        35.4676, -97.5164
        ],
      zoom: 4,
      layers: [map, earthquakes]
      });

    
  var info = L.control({
    position: "bottomright"
  });

  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend"),
      labels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
      colors = ["green", "greenyellow", "yellowgreen", "yellow", "orange", "red"];

    for (var i = 0; i < labels.length; i++) {
      div.innerHTML += '<i style="background:' + markerColor(i) + '"></i> ' +
              labels[i] + '<br>' ;
    }
    return div;
  };
  // Add the info legend to the map
  info.addTo(myMap);



}

function markerColor(feature) {
  if (feature > 5) {
    return "red"
  }

  else if (feature >= 4) {
    return "orangered"
  } 
  
  else if (feature >= 3) {
    return "orange"
  }

  else if (feature >= 2) {
    return "yellow"
  }

  else if (feature >= 1) {
    return "yellowgreen"
  }
  else {
    return "greenyellow"
  }
};

function markerSize(feature) {
  return feature * 3;
}
