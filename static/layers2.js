
// let url= "https://data.cityofchicago.org/resource/hec5-y4x5.json?$limit=10000";
//   d3.json(url).then(function(response) {
  
//     console.log(response);
function createMap(graffitiSpot) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      }).addTo(myMap);
    
    
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Graffiti Spots": graffitiSpot
    };
  
    // Create the map object with options
    var myMap = L.map("map", {
      center: [41.87, -87.62],
      zoom: 13,
      layers: [lightmap, graffitiSpot]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }

function createMarkers(data) {

//     let url= "https://data.cityofchicago.org/resource/hec5-y4x5.json?$limit=10000";
//   d3.json(url).then(function(response) {
//     console.log(response);
    var locations = data.location;
    // Initialize an array to hold bike markers
    var graffitiMarkers = [];
  
    // Loop through the stations array
    for (var i = 0; i < locations.lenght; i++) {
      var location = locations[i];

    //   if (location) {
    //     graffitiMarkers.push([location.latitude, location.longitude]);
    //   }
  
    //   For each station, create a marker and bind a popup with the station's name
      var graffitiMarker = L.marker([location.latitude, location.longitude]);
        // .bindPopup("<h3>" + location.latitude + "<h3><h3>Status: " + location.longitude + "</h3>");
  
      // Add the marker to the bikeMarkers array
      graffitiMarkers.push(graffitiMarker);
    }

  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(graffitiMarkers));
  };
// 
  d3.json("https://data.cityofchicago.org/resource/hec5-y4x5.json?$limit=10000", createMarkers);
