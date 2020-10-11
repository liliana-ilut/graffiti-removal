// Create a baseMaps object to hold the lightmap layer

function createMap(graffitiRemoval) {
// var myMap = L.map("map", {
//     center: [41.87, -87.62],
//     zoom: 13
//   });
  
//   var lightmap= L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);
let url= "https://data.cityofchicago.org/resource/hec5-y4x5.json?$limit=10000";
  d3.json(url).then(function(response) {
  
    console.log(response);
  });

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Graffiti": graffitiRemoval
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [41.87, -87.62],
    zoom: 12,
    layers: [lightmap, graffitiRemoval]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

//   console.log(graffitiRemoval)

};


  
    // Create a layer group made from the bike markers array, pass it into the createMap function
  // createMap(L.layerGroup(bikeMarkers));

// //   function createMarkers(response) {

//     // Pull the "stations" property off of response.data
//     var graffiti = response.graffiti.address;
  
//     // Initialize an array to hold bike markers
//     var graffitiSpot = [];
  
//     // Loop through the stations array
//     for (var index = 0; index < graffiti.length; index++) {
//       var graffitiSpot = graffitiSpot[index];
  
//       // For each station, create a marker and bind a popup with the station's name
//       var graffitiMarker = L.marker([graffitiSpot.lat, graffitiSpot.lon])
//         .bindPopup("<h3>" + graffitiSpot.address + "<h3>");
  
//       // Add the marker to the bikeMarkers array
//       graffitiMarkers.push(graffitiMarker);
//     }
  
//     // Create a layer group made from the bike markers array, pass it into the createMap function
//     createMap(L.layerGroup(graffitiMarkers));
//   }
// Create a baseMaps object to hold the lightmap layer

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



let url= "https://data.cityofchicago.org/resource/hec5-y4x5.json?$limit=10000";
d3.json(url).then(function(response) {

  console.log(response);

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;

    if (location) {
      heatArray.push([location.latitude, location.longitude]);
    }
  }
  console.log(heatArray);
  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);


 
});
function createMap(graffitiRemoval) {
// var myMap = L.map("map", {
//     center: [41.87, -87.62],
//     zoom: 13
//   });

//   var lightmap= L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);
let url= "https://data.cityofchicago.org/resource/hec5-y4x5.json?$limit=10000";
d3.json(url).then(function(response) {

  console.log(response);
});

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

var baseMaps = {
  "Light Map": lightmap
};

// Create an overlayMaps object to hold the bikeStations layer
var overlayMaps = {
  "Graffiti": graffitiRemoval
};

// Create the map object with options
var map = L.map("map", {
  center: [41.87, -87.62],
  zoom: 12,
  layers: [lightmap, graffitiRemoval]
});

// Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

//   console.log(graffitiRemoval)

};



  // Create a layer group made from the bike markers array, pass it into the createMap function
createMap(L.layerGroup(graffitiMarkers));

//   function createMarkers(response) {

  // Pull the "stations" property off of response.data
  var graffiti = response.graffiti.address;

  // Initialize an array to hold bike markers
  var graffitiSpot = [];

  // Loop through the stations array
  for (var index = 0; index < graffiti.length; index++) {
    var graffitiSpot = graffitiSpot[index];

    // For each station, create a marker and bind a popup with the station's name
    var graffitiMarker = L.marker([graffitiSpot.lat, graffitiSpot.lon])
      .bindPopup("<h3>" + graffitiSpot.address + "<h3>");

    // Add the marker to the bikeMarkers array
    graffitiMarkers.push(graffitiMarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(graffitiMarkers));