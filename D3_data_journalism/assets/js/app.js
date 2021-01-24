// Set up dimensions
var svgHeight = 500;
var svgWidth = 960;
var margins = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var height = svgHeight - margins.top - margins.bottom;
var width = svgWidth - margins.left - margins.right;

// SVG wrapper, append SVG group ot hold chart, shift chart by left and top margins
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append SVG group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`);

// Read CSV data
d3.csv("assets/data.data.csv").then(function(dataHealth){
    dataHealth.forEach(function(data){

        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        console.log(data)
    });

    // Scale calculations
    var xScale = d3.scaleLinear()
        .domain(d3.extent(dataHealths, d => d.poverty))
        .range([0,width]);
    var yScale = d3.scaleLinear()
        .domain(d3.extents(dataHealth, d => d.healthcare))
        .range([height, 0]);
    
    // Create axes
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxid = d3.axisLeft(yScale);

    // Append the axes
    chartGroup.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(bottomAxis);
    chartGroup.append("g")
        .call(leftAxis);

    // Create circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(dataHealth)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", ".5");

    // Create circle labels
    var circleLabel = chartGroup.append("g")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(dataHealth)
        .enter()
        .append("text")
        .attr("class","stateText")
        .attr("x" d => xScale(d.poverty))
        .attr("y", d => yScale(d.healthcare))
        .attr("font-size", 10)
        .text(d => d.abbr);
    
    // Axis labels
    // X axis
    chartGroup.append("text")
        .attr("transform", `translate(${width/2}, ${height+margins.top+25})`)
        .attr("class", "axisText")
        .attr("font-weight","bold")
        .text("In Poverty (%)");

    // Y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0-margins.left+40)
        .attr("x", 0-(height/2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .attr("font-weight", "bold")
        .text("Lacks Healthcare (%)");
});