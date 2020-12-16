// This is the most sophisticated looking assignment we've had so far.  If 
// done correctly, I believe it is good enough for portfolio demonstration.
// This is a dashboard which visualizes bacteria research/data.  

// First I examined the data to get a sense of what we have.
// datasetExample = d3.json("samples.json");

// datasetExample.then(function(data){
//     console.log(data);
// });

// Loop through the values in the data to append to the drop down menu
// I got significant help on this from askbcs and https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object

var IDs = [];

datasetNames = d3.json("samples.json").then(function (response) {
    var IDs = Object.values(response.names);
    for(i=0; i < IDs.length; i++) {
        d3.select("#selDataset").append("option").text(IDs[i]);
    };
});


d3.selectAll("#selDataset").on("change", getSelection);  
var testSubject = d3.select("#selDataset").property("value");

// get the value in the drop down when there's a change

function getSelection() {
    dataset = d3.json("samples.json").then(function (sampleData) {
        var testSubject = parseInt(d3.select("#selDataset").property("value"));

        //filter the dataset by the dropdown item
        var idData = sampleData.metadata.filter(m => m.id === testSubject);
        
        // pull out the data from the dropdown item for the demographic information
        var idDemoData = idData.map(m => m.id);
        var ethDemoData = idData.map(m => m.ethnicity);
        var genDemoData = idData.map(m => m.gender);
        var ageDemoData = idData.map(m => m.age);
        var locDemoData = idData.map(m => m.location);
        var bbDemoData = idData.map(m => m.bbtype);
        var wfDemoData = idData.map(m => m.wfreq);
        d3.select("#idDemographic").text(`id: ${idDemoData}`);
        d3.select("#ethDemographic").text(`ethnicity: ${ethDemoData}`);
        d3.select("#genDemographic").text(`gender: ${genDemoData}`);
        d3.select("#ageDemographic").text(`age: ${ageDemoData}`);
        d3.select("#locDemographic").text(`location: ${locDemoData}`);
        d3.select("#bbDemographic").text(`bbtype: ${bbDemoData}`);
        d3.select("#wfDemographic").text(`wfreq: ${wfDemoData}`);

        
    });
    getGraphs()
};

function getGraphs(){
    dataset = d3.json("samples.json").then(function (sampleData) {
        var testSubject = parseInt(d3.select("#selDataset").property("value"));

        //filter the dataset by the dropdown item
        var idData = sampleData.samples.filter(m => +m.id === testSubject);
    console.log(idData);
    });
    // // pull out the data for the graph
    // var valuesForGraphBridge = sampleData.samples.filter(m => +m.id === +testSubject);
    // console.log(sampleData.samples);
    // console.log(testSubject);
    // var valuesForGraph = valuesForGraphBridge[0].sample_values;
    
    // //sort and slice the data
    // valuesForGraph.sort(function compareFunction(firstNum, secondNum) {
    //     // resulting order is (1, 2, 3)
    //     return secondNum - firstNum;
    //   });
      
    // console.log(valuesForGraph);

    // //pull out the names for the graph
    // var otuIds = sampleData.samples.filter(m => +m.id === +testSubject);
    // var otuIdsForGraph = otuIds[0].otu_ids;
    // console.log(otuIdsForGraph);

    // // plot bar graph with data and names
    // d3.json("samples.json").then((data) => {
    //     //  Create the Traces
    //     var trace1 = [{
    //       x: valuesForGraph,
    //       y: otuIdsForGraph,
    //       type: "box",
    //       name: "Cancer Survival",
    //       orientation: "h"
    //     }];
    //     Plotly.newPlot("#bar", trace1);
    // });
};



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