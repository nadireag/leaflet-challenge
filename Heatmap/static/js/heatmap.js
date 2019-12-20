// create the base map
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3
  });

// get the queryurl 
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-08-01&endtime=" +
 "2019-08-10&maxlongitude=175.52148437&minlongitude=-170.83789062&maxlatitude=80.74894534&minlatitude=-85.7433195";
 
// get the light tile layer
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

// read the data and get the location info
d3.json(queryUrl, function(data){
  console.log(data)
  // create the heat array to hold lat and long info
  var heatArray = [];

  var location = data.features
  console.log(location)
  
  // loop through the array to get lat and long info
  location.forEach(function(result){

    var lat = result.geometry.coordinates[1];
    var long = result.geometry.coordinates[0];

    //console.log(mag)
    // push the lat and long info to the heat array
    heatArray.push([lat, long])  
  
  })
  //console.log(heatArray)
    
  // create the heat layer and add it to the map
  var heat = L.heatLayer(heatArray, {
    raius :25,
    blur: 10, 
    max:4,
    //gradient : {0.1: 'blue', 0.6: 'yellow', 0.4: 'red' }
    
  }).addTo(myMap)

});





