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

var url = "/api"
// Grab the data with d3
d3.json(url).then(function(response) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {
    
    

    // Set the data location property to a variable
    var lat = response[i].latitude;
    var lng = response[i].longitude;
    var addr = response[i].address;
    var spot= response[i].graffiti_spot;
   

    // Check for location property
    
      // var locationString = "Latitude: " + lat + ", Longitude:" + lng;
      // var addressString = "Street Address: " + addr;
      // var spotString = "Graffiti Spot: " + spot;
      
  

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lat, lng])
        .bindPopup("<h5>" + "Street Address: " + "</h5>" + "<h4>" + addr + "</h4><h5> Graffiti spot: </h5>" + "<h4>" + spot + "</h>"));
        // .bindPopup(spotString));
      //console.log(response[i].location)
    }

  

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});