// This is the most sophisticated looking assignment we've had so far.  If 
// done correctly, I believe it is good enough for portfolio demonstration.
// This is a dashboard which visualizes bacteria research/data.  

// examine the data to get a sense of what we have.
dataset = d3.json("samples.json").then(function (response) {
    var IDs = Object.values(response.names);
    for(i=0; i < IDs.length; i++) {
        d3.select("#selDataset").append("option").text(IDs[i])
    };
    
    
    // Object.values(response).forEach(function(value) {
    //     d3.select("#selDataset").append("option").text(value);
    // });


    // for (let [key, value] of Object.entries(response)) {
    //     d3.select("#selDataset").append("option").text(value)
    //   };
    
});

// dataset.then(function(data){
//     console.log(data);
// });




// // sort and slice for the top 10 values
// var datasetArray = [Object.values(dataset.samples)]
// console.log(datasetArray)

// var sortTestValues = datasetArray.sort((a,b) => b.samples.values - a.samples.values);
// var sliceTestValues = sortTestValues.slice([0, 10]);

// //graph the top 10 values
// d3.json("samples.json").then((data) => {
//     //  Create the Traces
//     var trace1 = [{
//       x: sliceTestValues,
//       y: data.names,
//       type: "bar",
//       name: "Cancer Survival",
//       orientation: "h"     
//     }];
// var layout = {
//     title: "Top 10 OTUs with sample values",
//     height: 500,
//     length: 500
// }

//     Plotly.newPlot("gauge", trace1);
// });