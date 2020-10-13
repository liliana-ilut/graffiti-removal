
d3.csv("https://data.cityofchicago.org/resource/hec5-y4x5.json?$limit=100").then(function(data) {
  console.log(data[0]);
    data.forEach(function(d) {
       d.police_district = +police_district;
       d.creation_date = +creation_date;
      
      
      var police_district = data.map(d =>d.police_district);
      var creation_date = data.map(d=>d.creation_date);
      console.log(creation_date)
    });
  });
    //   console.log(police_district);
    //   //setting up districts
    //   var  policeDistrictLabels= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    //  var district1=0;
    //   var district2=0;
    //  var  district3=0;
    //  var  district4=0;
    //  var district5=0;
    //   var counts = {};

      // for (var i = 0; i < police_district.length; i++) {
      //   var num = police_district[i];
      //   counts[num] = counts[num] ? counts[num] + 1 : 1;};
      //   console.log(counts);
      // for(let i = 0; i < str.length; i++){
      //   // If the letter is a
      //   if(str[i] == "a"){
      //     // Add 1 to the counter
      //     aCount += 1
      //   }
      // }

    
    //  for (let i = 0; i < police_district.length; i++){
    //    if(police_district[i]= 1){
    //     district1+=1;
    //  } else if (police_district[i]= 2) {
    //   district2+=1
    //  };
    //  console.log(district1, district2);

     
//     };
    
//   });
// });





// new Chart(document.getElementById("line-chart"), {
//     type: 'line',
//     data: {
//       labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
//       datasets: [{ 
//           data: [86,114,106,106,107,111,133,221,783,2478],
//           label: "Africa",
//           borderColor: "#3e95cd",
//           fill: false
//       }, { 
//         data: [282,350,411,502,635,809,947,1402,3700,5267],
//         label: "Asia",
//         borderColor: "#8e5ea2",
//         fill: false
//       }, { 
//         data: [168,170,178,190,203,276,408,547,675,734],
//         label: "Europe",
//         borderColor: "#3cba9f",
//         fill: false
//       }, { 
//         data: [40,20,10,16,24,38,74,167,508,784],
//         label: "Latin America",
//         borderColor: "#e8c3b9",
//         fill: false
//       }, { 
//         data: [6,3,2,2,7,26,82,172,312,433],
//         label: "North America",
//         borderColor: "#c45850",
//         fill: false
//       }
//     ]
//   },
//   options: {
//     title: {
//       display: true,
//       text: 'Dates'
//     }
//   }
// });

// new Chart(document.getElementById("bar-chart"), {
//     type: 'bar',
//     data: {
//       labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
//       datasets: [
//         {
//           label: "Population (millions)",
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
// });
