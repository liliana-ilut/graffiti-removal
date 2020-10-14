var baseURL = "https://data.cityofchicago.org/resource/hec5-y4x5.json?";
var date = "$where=creation_date between '2018-11-06T00:00:00.000' and '2018-12-18T00:00:00.000'";
var status = "&status=Completed";
var limit = "&$limit=10";

// Assemble API query URL
var url = baseURL + date + status + limit;

// Grab the data with d3
d3.json(url).then(function(data) {


// Variables
let button = d3.select("#filter-btn");
let inputField1 = d3.select("#zipcode");
let tbody = d3.select("tbody");
var resetbtn = d3.select("#reset-btn");
// let columns = ["creation_date", "status", "status", "completion_date", "service_request_number", "durationMinutes", "type_of_service_request", "what_type_of_surface_is_the_graffiti_on_", "where_is_the_graffiti_located_", "street_address", "zip_code", "x_coordinate", "y_coordinate", "ward", "police_district", "community_area", "ssa", "latitude", "longitude", "location"]
let columns = ["status", "completion_date", "service_request_number", "type_of_service_request", "what_type_of_surface_is_the_graffiti_on_", "where_is_the_graffiti_located_", "street_address", "zip_code", "ward", "police_district", "community_area", "latitude", "longitude"]


let populate = (dataInput) => {

  dataInput.forEach(graffiti => {
    let row = tbody.append("tr");
    columns.forEach(column => row.append("td").text(graffiti[column])
    )
  });
}

//Populate table
populate(data);

// Filter by attribute
button.on("click", () => {
  d3.event.preventDefault();
  let inputDate = inputField1.property("value").trim();
  let filterZipCode = data.filter(data => data.zip_code === inputDate);
  console.log(filterZipCode)

  // Add filtered sighting to table
  tbody.html("");

  let response = {filterZipCode}

  if (response.filterZipCode.length !== 0) {
    populate(filterZipCode);
  }
    else {
      tbody.append("tr").append("td").text("No results found!"); 
    }
});

resetbtn.on("click", () => {
    tbody.html("");
    populate(data);
    console.log("Table reset");
  })
});