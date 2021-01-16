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
    