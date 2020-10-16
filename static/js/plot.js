/* global Plotly */
var url =
  `https://data.cityofchicago.org/resource/hec5-y4x5.json?$limit=100000`;
/**
 * Helper function to select data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}
function buildPlot() {
  d3.json(url).then(function(data) {
    console.log(data);
    var creationDate = data.map(d => d.creation_date);
    console.log(creationDate);
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
      // mode: "lines",
      name: "Graffiti Complaints",
      x: Object.keys(counts),
      y: Object.values(counts),
      // y: endDate,
      line: {
      color: "#34ebcf"
      }
    };
    var data = [trace1];
    var layout = {
      title: {
        text: "Graffiti Removal Requests",
        font: {
          family: "Calibri",
          size: 24,
          color: '#7f7f7f'
        }
      },
      xaxis: {
        title: {
          text: 'Date',
          font: {
            family: 'Calibri',
            size: 18,
            color: '#7f7f7f'
          }
        },
      },
      yaxis: {
        title: {
          text: 'Number of Requests',
          font: {
            family: 'Calibri',
            size: 18,
            color: '#7f7f7f'
          }
        }
      }
    };
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