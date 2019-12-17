// create the base map
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });

// add the light layer tile 
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.light",
accessToken: API_KEY
}).addTo(myMap);


// get the url for the earthquake data
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=" +
"2019-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// create a function that changes marker size depending on the magnitute values
function markerSize(mag){
    return mag * 7
}

// create a function that gets colors for circle markers
function getColors(mag) {
  if (mag < 1){
    return fillColor = "#B7DF5F"
  }
  else if ( mag < 2){
    return fillColor = "#DCED11"
  }
  else if (mag < 3){
    return fillColor = "#EDD911"
  }
  else if (mag < 4){
    return fillColor = "#EDB411"
  }
  else if (mag < 5 ){
    return fillColor = "#ED7211"
  }
  else {
    return fillColor = "#ED4311"
  }
}

// create a function that creates markers
function createCircleMarker(feature, latlng ){

// Change the values of these options to change the symbol's appearance
  var markerOptions = {
    radius: markerSize(feature.properties.mag),
    fillColor: getColors(feature.properties.mag),
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
  var geojson;
  // loop through the data to create markers and popup
  earthquakes.forEach(function(result){
    console.log(result.properties)
    geojson = L.geoJSON(result,{
      pointToLayer: createCircleMarker
      // add popups to the circle markers to display data
    }).bindPopup("Date: " + new Date(result.properties.time) + "<br>Place: " + result.properties.place + "<br>Magnitude: " + result.properties.mag).addTo(myMap)
  })

  // create legennds and add to the map
  var legend = L.control({position: "bottomright" });
  legend.onAdd = function(){
    var div = L.DomUtil.create("div", "info legend");
    var categories = ["0-1","1-2","2-3","3-4","4-5","5+"]
    var colors = ["#B7DF5F","#DCED11","#EDD911","#EDB411","#ED7211", "#ED4311"]
    var labels =[]
    
    // loop through categories and put them in the labels array
    for (var i=0; i < categories.length; i++ ){
      div.innnerHTML+= labels.push(
        '<i class="circle" style="background:' + colors[i] + '"></i> ' +
            (categories[i] ? categories[i] : '+')
      )
    }
    div.innerHTML = labels.join("<br>") ;
  
    return div;
  };
  legend.addTo(myMap);

});

