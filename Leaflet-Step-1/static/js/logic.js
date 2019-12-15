// get the url for the earthquake data
var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-10-24&endtime=" +
"2019-10-25&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// read the data with get request
d3.json(queryUrl,function(earthquakeData){
    console.log(earthquakeData)

});