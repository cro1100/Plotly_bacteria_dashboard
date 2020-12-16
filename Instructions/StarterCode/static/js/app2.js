// This is the most sophisticated looking assignment we've had so far.  If 
// done correctly, I believe it is good enough for portfolio demonstration.
// This is a dashboard which visualizes bacteria research/data.  

// examine the data to get a sense of what we have.
dataset = d3.json("samples.json");

dataset.then(function(data){
    console.log(data);
});

var sortTestValues = dataset.sort((a,b) => b.samples.values - a.samples.values);
var sliceTestValues = sortTestValues.slice([0, 10]);

d3.json("samples.json").then((data) => {
    //  Create the Traces
    var trace1 = [{
      x: sliceTestValues,
      y: data.names,
      type: "bar",
      name: "Cancer Survival",
      orientation: "h"     
    }];

    Plotly.newPlot("plot", trace1);
});

// function getData() {
//     var testSubject = d3.select("#selDataset").property("value");
//     d3.json("samples.json").then(function (response) {
//         response.forEach(element => {
//             if (testSubject === element) {
//                 subject = element;
//             }
//     });
// });
// };
