// create the map
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });

  // add the layer tile 
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);


// get the url for the earthquake data
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
"2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// create a function that changes marker size depending on the magnitute values
function markerSize(mag){
    return mag * 7
}

// // create a function that creates markers
function createCircleMarker(feature, latlng ){

  // Change the values of these options to change the symbol's appearance
    var markerOptions = {
      radius: markerSize(feature.properties.mag),
      fillColor: "yellow",
      color: "black",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }
    return L.circleMarker( latlng, markerOptions );
}
  
// Use json request to fetch the data from a URL
d3.json(queryUrl, function(data) {

  console.log(data)

  var earthquakes = data.features

  console.log(earthquakes)

  earthquakes.forEach(function(result){
    console.log(result.properties)
    L.geoJSON(result,{
      pointToLayer: createCircleMarker
    }).bindPopup("<h4>Date: " + new Date(result.properties.time) + "</h4><br><h4>Place: " + result.properties.place + "</h4><br><h4> Magnitude: " + result.properties.mag).addTo(myMap)
  })
})


  