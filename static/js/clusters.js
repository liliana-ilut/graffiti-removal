var myMap = L.map("map", {
  center: [41.87, -87.62],
  zoom: 13
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL = "https://data.cityofchicago.org/resource/hec5-y4x5.json?";
var date = "$where=creation_date between '2018-11-06T00:00:00.000' and '2018-12-18T00:00:00.000'";
var status = "&status=Completed";
var limit = "&$limit=10000";

// Assemble API query URL
var url = baseURL + date + status + limit;

// Grab the data with d3
d3.json(url).then(function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    var location = response[i].location;

    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.latitude, location.longitude])
        .bindPopup(response[i].location));
        console.log(response[i].location)
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});