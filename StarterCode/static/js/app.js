
//init function
function init() {


    //import json data
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


    d3.json(url).then(function(data) {
        console.log(data);
        dropDown(data.names);
        barChart(data.samples[0]);
        bubbleChart(data.samples[0]);
        theMetadata(data.metadata[0]);
    });

};

//create dropdown menu
function dropDown(names) {

    //select id
    let dropdownMenu = d3.select("#selDataset");

    //loop through data names and add to dropdown bar
    for (let i = 0; i < names.length; i++) {
    
        let menuChoice = dropdownMenu.append("option");
        menuChoice.text(`${names[i]}`);
    };

};

//create barChart
function barChart(id) {

    // create top 10 arrays
    let topTenIds = [];
    let topSampleValues = [];
    let topLabels = [];


    // push data into arrays
    for (let i = 0; i < 10; i++) {
        
        topTenIds.push(`OTU ${id.otu_ids[i]}`);
        topSampleValues.push(id.sample_values[i]);
        topLabels.push(id.otu_labels[i]);
    };

    // reverse order
    revTen = topTenIds.reverse();
    revSample = topSampleValues.reverse();
    revLabels = topLabels.reverse();

    // print arrays
    //console.log(topTenIds);
    //console.log(topSampleValues);
    //console.log(topLabels);

    // create chart
    let topChart = [{
        x: revSample,
        y: revTen,
        text: revLabels,
        type: "bar",
        orientation: "h"
    }];

    let layout = {
        title: "Top OTUs",
        margin: { t: 50, r: 25, l: 100, b: 50 }
    };

    Plotly.newPlot("bar", topChart, layout);

};

// create bubble chart
function bubbleChart(id) {

    // get ids, sample values, labels
    let otuIds = id.otu_ids;
    let sampleValues = id.sample_values;
    let labels = id.otu_labels;

    //console.log(otuIds);
    //console.log(sampleValues);
    //console.log(labels);

    // create graph attributes
    let trace = {
        x: otuIds,
        y: sampleValues,
        text: labels,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: otuIds.map(function(i) {
                return '#' + i;
            }),
        },
    };

    // create layout
    let layout = {
        xaxis: {
            title: "OTU IDs",
            margin: { t: 0, r: 25, l: 100, b: 50 },
        },
    };
    
    // plot chart
    Plotly.newPlot("bubble", [trace], layout);
};




// display meta data
function theMetadata(id) {
    
    // d3 select proper class
    let panelBody = d3.select(".panel-body");

    // clear html space
    d3.select("#sample-metadata").html("");

    // append data to chart
    panelBody.append('p').text(`id: ${id.id}`)
    panelBody.append('p').text(`ethnicity: ${id.ethnicity}`)
    panelBody.append('p').text(`gender: ${id.gender}`)
    panelBody.append('p').text(`age: ${id.age}`)
    panelBody.append('p').text(`location: ${id.location}`)
    panelBody.append('p').text(`bbtype: ${id.bbtype}`)
    panelBody.append('p').text(`wfreq: ${id.wfreq}`)

};

// when input value changes
function optionChanged(value) { 

    // import json data
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


    d3.json(url).then(function(data) {
        console.log(data);


    // name variable
    names = data.names

        // for (let i = 0; i < data.names.length; i++) {
        //     value = data.names[i]
        // }

    // Log the new value

    sample_index = names.indexOf(value)

    console.log(sample_index)
    
    // distrubte new value to other functions
    barChart(data.samples[sample_index]);
    bubbleChart(data.samples[sample_index]);
    theMetadata(data.metadata[sample_index]);  


    });
};


init();


