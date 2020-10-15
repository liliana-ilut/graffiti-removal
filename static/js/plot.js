/* global Plotly */
var url =
  `https://data.cityofchicago.org/resource/hec5-y4x5.json?$limit=1000`;
/**
 * Helper function to select data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}
function buildPlot() {
  d3.json(url).then(function(data) {
    console.log(data);
    // Grab values from the data json object to build the plots
    // var name = data.dataset.name;
    // var stock = data.dataset.dataset_code;
    var creationDate = data.map(d => d.creation_date);
    console.log(creationDate);
    // var endDate = data.dataset.end_date;
    // var dates = unpack(data.dataset.data, 0);
    // var closingPrices = unpack(data.dataset.data, 4);
    let counts={};
    for (d of creationDate){
      // console.log(d);
      if (d in counts){
        counts[d] = counts[d]+1;
      } 
      else{
        counts[d]=1;
      }
    }
    console.log(counts);
    var trace1 = {
      type: "scatter",
      mode: "lines",
      // name: name,
      x: Object.keys(counts),
      y: Object.values(counts),
      // y: endDate,
      // line: {
      color: "#17BECF"
      // }
    };
    var data = [trace1];
    var layout = {};
    // var layout = {
    //   title: `${GraffitiRemovalRequests} Graffiti Removal Requests`,
    //   xaxis: {
    //     range: [startDate, endDate],
    //     type: "date"
    //   },
    //   yaxis: {
    //     autorange: true,
    //     type: "linear"
    //   }
    // };
    Plotly.newPlot("plot", data, layout);
  });
}
buildPlot();