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

//call getSelection at the beginning on an initial value

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

        barBubbleGraph(testSubject)
        gaugeChart(testSubject)
    });
    
};

// this creates the graphs of the top 10 numbers by sorting the elements then
// slicing them.
function barBubbleGraph(testSubjectId){
    console.log(testSubjectId);
    
    // create an array of the values filtered by the drop-down selection
    dataset = d3.json("samples.json").then(function (sampleData) {
        let idValues = sampleData.samples.filter(m => +m.id === testSubjectId);
        console.log(idValues);

        let forValues = idValues[0]["sample_values"];
        let otuIds = idValues[0]["otu_ids"];
        let otuLabels = idValues[0]["otu_labels"];

        let top10Values = forValues.slice(0, 10).reverse();
        let top10Ids = otuIds.slice(0, 10).reverse().map(element => `OTU ${element}`);

        
        console.log(top10Values);
        console.log(top10Ids);

                // bar graph the results
        d3.json("samples.json").then((data) => {
            var trace1 = [{
                x: top10Values,
                y: top10Ids,
                type: "bar",
                name: "Cancer Survival",
                orientation: "h"
            }];
            Plotly.newPlot("bar", trace1);
        });

        // bubble plot; taken from https://plotly.com/javascript/bubble-charts/
        var trace1 = {
            x: otuIds,
            y: forValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
              color: otuIds,
              size: forValues
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Marker Size and Color',
            showlegend: false,
          };
          
          Plotly.newPlot('bubble', data, layout);

    });
};

    function gaugeChart(testSubjectId) {
        dataset = d3.json("samples.json").then(function (sampleData) {
    
            //filter the dataset by the dropdown item
            var idData = sampleData.metadata.filter(m => m.id === testSubjectId);
            
            let gaugeData = idData.map(m => m.wfreq);
            console.log(gaugeData)

            var data = [
                {
                  domain: { x: [0, 1], y: [0, 1] },
                  value: gaugeData[0],
                  title: { text: "Belly Button Washing Frequency" },
                  type: "indicator",
                  mode: "gauge+number+delta",
                  delta: { reference: 10 },
                  gauge: {
                    axis: { range: [null, 10] },
                    steps: [
                      { range: [0, 1], color: "rgb (31, 9, 180)" },
                      { range: [1.01, 2], color: "rgb (31, 39, 180)" },
                      { range: [2.01, 3], color: "rgb (31, 69, 180)" },
                      { range: [3.01, 4], color: "rgb (31, 99, 180)" },
                      { range: [4.01, 5], color: "rgb (31, 129, 180)" },
                      { range: [5.01, 6], color: "rgb (31, 159, 180)" },
                      { range: [6.01, 7], color: "rgb (31, 189, 180)" },
                      { range: [7.01, 8], color: "rgb (31, 219, 180)" },
                      { range: [8.01, 9], color: "rgb (31, 249, 180)" },
                      { range: [9.01, 10], color: "rgb (31, 279, 180)" }
                    ],
                    // threshold: {
                    //   line: { color: "red", width: 4 },
                    //   thickness: 0.75,
                    //   value: 10
                    // }
                  }
                }
              ];
              
              var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
              Plotly.newPlot('gauge', data, layout);
            
    });

};

