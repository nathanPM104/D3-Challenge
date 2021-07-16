// set the dimensions and margins of the graph
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3 
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("assets/data/data.csv").then(function(data) {
    console.log('test')
    console.log(data)
  // Add X axis
  var x = d3.scaleLinear()
    .domain([30000, d3.max(data, d => d.income)])
    .range([ 0, width ]);
  chartGroup.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.obesity)])
    .range([height, 0]);
  chartGroup.append("g")
    .call(d3.axisLeft(y));

// Creating Chart 
chartGroup.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", function (d) { return x(d.income); } )
.attr("cy", function (d) { return y(d.obesity); } )
.attr("r", "10")
.attr("stroke-width", "1")
.classed("stateCircle", true)
.attr("opacity", 0.90);

chartGroup.append("g")
  .selectAll('text')
  .data(data)
  .enter()
  .append("text")
  .text(d=>d.abbr)
  .attr("x", function (d) { return x(d.income); } )
  .attr("y", function (d) { return y(d.obesity); } )
  .classed(".stateText", true)
  .attr("font-family", "sans-serif")
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .attr("font-size", "5px")
  .style("font-weight", "bold")
  .attr("alignment-baseline", "central");
  
// Create axes labels
 chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .attr("class", "axisText")
  .style("fill", "black")
  .style("font", "20px sans-serif")
  .style("font-weight", "bold")
  .text("Obesity (BMI)");

chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  .attr("class", "axisText")
  .style("font", "20px sans-serif")
  .style("font-weight", "bold")
  .text("State Average Income");
})

