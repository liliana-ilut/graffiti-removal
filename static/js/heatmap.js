
var myMap = L.map("map", {
  center: [41.87, -87.62],
  zoom: 13
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);



let url= "/api";
d3.json(url).then(function(response) {

  console.log(response);

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var lat = response[i].latitude;
    var lng = response[i].longitude;

    
      heatArray.push([lat, lng]);
  
  }
  console.log(heatArray);
  L.heatLayer(heatArray, {
    radius: 20,
    blur: 25,
    gradient: {
      0.5: 'blue', 
      0.6: 'purple', 
      0.2: 'green', 
      0.9: 'yellow', 
      1.0: 'red' }

  }).addTo(myMap);


 
});