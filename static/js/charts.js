
const url = "https://data.cityofchicago.org/resource/hec5-y4x5.json?$limit=100";
d3.json(url).then(function(data) {
  console.log(data.ward);

    data.forEach(function(d) {
      let dates = data.map(d =>d.creation_date);
     
      console.log(dates);

      // new Chart(document.getElementById("bar-chart"), {
  
      //     type: 'bar',
      //     data: {
      //       labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      //       datasets: [
      //         {
      //           label: "Complaints (hundreds)",
      //           backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
      //           data: [2478,5267,734,784,433]
      //         }
      //       ]
      //     },
      //     options: {
      //       legend: { display: false },
      //       title: {
      //         display: true,
      //         text: 'Predicted world population (millions) in 2050'
      //       }
      //     }
      //   });

      var color = Chart.helpers.color;
      var lineChartData = {
        labels: dates,
        datasets: [{
          label: 'Daily COVID Cases',
          backgroundColor: color(window.chartColors.red).alpha(0.4).rgbString(),
          borderColor: window.chartColors.red,
          borderWidth: 2,
          fill: true,
          data: dates,
          yAxisID: 'y-axis-1',
          pointRadius: 0,
          pointHoverRadius: 10
       }]
        
        //   label: 'SP 500',
        //   borderColor: window.chartColors.blue,
        //   backgroundColor: window.chartColors.blue,
        //   fill: false,
        //   borderDash: [5, 5],
        //   data: sp,
        //   yAxisID: 'y-axis-2',
        //   pointRadius: 0,
        //   pointHoverRadius: 10
        // }, {
        //   label: 'VIX (Fear Index)',
        //   borderColor: window.chartColors.purple,
        //   backgroundColor: window.chartColors.purple,
        //   fill: false,
        //   data: vix,
        //   yAxisID: 'y-axis-3',
        //   pointRadius: 3,
        //   pointHoverRadius: 10
        // }, {
        //   label: 'XAL Airline Index',
        //   borderColor: window.chartColors.green,
        //   backgroundColor: window.chartColors.green,
        //   fill: false,
        //   data: xal,
        //   yAxisID: 'y-axis-4',
        //   pointRadius: 0,
        //   pointHoverRadius: 10
        // }]
      };
    
// new Chart(document.getElementById("line-chart"), {
//     type: 'line',
//     data: dates,
//     options: {
//         scales: {
//             xAxes: [{
//                 type: 'time',
//                 time: {
//                     unit: 'month'
//                 }
//             }]
//         }
//     }
// });

});
});


// function buildPlot() {
//   var url = "https://data.cityofchicago.org/resource/hec5-y4x5.json?$limit=100";

//   d3.json(url).then(function(data) {

    // Grab values from the response json object to build the plots
    // var name = data.dataset.name;
    // var stock = data.dataset.dataset_code;
    // var startDate = data.dataset.start_date;
    // var endDate = data.dataset.end_date;
    // var dates = unpack(data.dataset.data, 0);
    // var openingPrices = unpack(data.dataset.data, 1);
    // var highPrices = unpack(data.dataset.data, 2);
    // var lowPrices = unpack(data.dataset.data, 3);
    // var closingPrices = unpack(data.creation_date);
    // console.log(creation_date)

    // getMonthlyData();

    // var trace1 = {
    //   type: "scatter",
    //   mode: "lines",
    //   name: name,
    //   x: dates,
    //   y: closingPrices,
    //   line: {
    //     color: "#17BECF"
    //   }
    // };

// d3.json(url).then(function(data) {
//   console.log(data);

//     data.forEach(function(d) {
//       creation_date=[]
    
//       console.log(d.creation_date);
   
    //   d.longitude = +d.longitude;

      // Prototypical use case increments loop counter by one on each iteration
// for (var i = 0; i < 10; i++) {
//   console.log("Iteration #", i);
// }
// Looping through an array
// var students = ["Johnny", "Tyler", "Bodhi", "Pappas"];
// for (var j = 0; j < data.length; j++) {
//   console.log(data.creation_date);
// }
      // console.log(d.creation_date);
  
    // console.log(data[0]);
  // let count = 0;
  // for (var j = 0; j < data.length; j++) {
  //   var complaints = data[j];
  //   count+=complaints;
  //   console.log(count);
  // };

//   function buildCharts(idx) { 
//     d3.json(url).then((data) => {
//         var creation_date = data.creation_date;
//         // var resultArray = creation_date.filter(sampleObj => sampleObj.id == idx);
//         // var result = resultArray[0];
//         console.log(creation_date);
//     });
// };
  






    // type: 'line',
    // data: {
    //   labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    //   datasets: [{ 
    //       data: [86,114,106,106,107,111,133,221,783,2478],
    //       label: "Africa",
    //       borderColor: "#3e95cd",
    //       fill: false
      // }, { 
      //   data: [282,350,411,502,635,809,947,1402,3700,5267],
      //   label: "Asia",
      //   borderColor: "#8e5ea2",
      //   fill: false
      // }, { 
      //   data: [168,170,178,190,203,276,408,547,675,734],
      //   label: "Europe",
      //   borderColor: "#3cba9f",
      //   fill: false
      // }, { 
      //   data: [40,20,10,16,24,38,74,167,508,784],
      //   label: "Latin America",
      //   borderColor: "#e8c3b9",
      //   fill: false
      // }, { 
      //   data: [6,3,2,2,7,26,82,172,312,433],
      //   label: "North America",
      //   borderColor: "#c45850",
      //   fill: false
  //     }
  //   ]
  // },
  // options: {
  //   title: {
  //     display: true,
  //     text: 'Dates'
  //   }
//   // }
// });


