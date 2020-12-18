// This is the most sophisticated looking assignment we've had so far.  If 
// done correctly, I believe it is good enough for portfolio demonstration.
// This is a dashboard which visualizes bacteria research/data.  

// examine the data to get a sense of what we have.
dataset = d3.json("samples.json");

dataset.then(function(data){
    console.log(data);
});

// var sortTestValues = dataset.sort((a,b) => b.samples.values - a.samples.values);
// var sliceTestValues = sortTestValues.slice([0, 10]);

// d3.json("samples.json").then((data) => {
//     //  Create the Traces
//     var trace1 = [{
//       x: sliceTestValues,
//       y: data.names,
//       type: "bar",
//       name: "Cancer Survival",
//       orientation: "h"     
//     }];

//     Plotly.newPlot("plot", trace1);
// });

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


// I had a lot of help in this section from our instructor Dan Mueller
// create a new object to sort the highest values
// const combinedSamples = {};
// for (let i = 0; i < idValues.length; i++) {
//     combinedSamples.push({sample_value: idValues.sample_values[i], otu_id: idValues.otu_ids[i]})
//     };
// combinedSamples.sort( (a,b) => a.sample_value - b.sample_value  );  

// // then recreate sorted lists
// sample_values = combinedSamples.map(s=>s.sample_value)
// otu_ids = combinedSamples.map(s=>s.otu_id)

//graph the results
// d3.json("samples.json").then((data) => {
//     var trace1 = [{
//         x: sample_values,
//         y: otu_ids,
//         type: "box",
//         name: "Cancer Survival",
//         orientation: "h"
//     }];
//     Plotly.newPlot("bar", trace1);
// });