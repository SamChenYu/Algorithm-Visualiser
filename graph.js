// Initial data generation
let data = generateData();

// Define the dimensions and margins for the chart
const margin = { top: 20, right: 30, bottom: 40, left: 40 };
const width = window.innerWidth * 0.6;
const height = window.innerHeight * 0.6;

// Create the SVG element
const svg = d3.select('#chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

// Define the scales for x and y axes
let xScale = d3.scaleBand()
    .domain(data.map((d, i) => i))
    .range([0, width])
    .padding(0.1);

let yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .nice()
    .range([height, 0]);

// Create and append the x axis
const xAxis = svg.append('g')
    .attr('class', 'axis-x')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickFormat(() => ''));

// Create and append the y axis
const yAxis = svg.append('g')
    .attr('class', 'axis-y')
    .call(d3.axisLeft(yScale));


// Initial bar creation
createAndUpdateBars(data);











// Function to update chart dimensions and redraw
function updateChart() {
    // Update dimensions based on viewport size
    const newWidth = window.innerWidth * 0.6;
    const newHeight = window.innerHeight * 0.6;
  
    // Update SVG width and height attributes
    svg.attr('width', newWidth + margin.left + margin.right)
       .attr('height', newHeight + margin.top + margin.bottom);
  
    // Update scales
    xScale.range([0, newWidth]);
    yScale.range([newHeight, 0]);
  
    // Update x axis
    xAxis.attr('transform', `translate(0, ${newHeight})`).call(d3.axisBottom(xScale).tickFormat(() => ''));
  
    // Update y axis
    yAxis.call(d3.axisLeft(yScale));
  
    // Update the position of the <g> element containing bars
    svg.selectAll('.bar-group')
       .attr('transform', (d, i) => `translate(${xScale(i)}, 0)`);
  
    // Redraw bars or any other elements as needed
    createAndUpdateBars(data);
  }
  
  // Call updateChart initially
  updateChart();
  
  // Listen for resize event and update chart accordingly
  window.addEventListener('resize', updateChart);
  









// Function to generate and shuffle data
function generateData() {
    const numElements = document.getElementById('numElements').value;
    return Array.from({ length: numElements }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
}

async function createAndUpdateBars(data) {
    // Update scales
    xScale.domain(data.map((d, i) => i));
    yScale.domain([0, d3.max(data)]).nice();

    // Update axes
    xAxis.call(d3.axisBottom(xScale).tickFormat(() => ''));
    yAxis.call(d3.axisLeft(yScale));

    // Bind data to bars
    const bars = svg.selectAll('.bar')
        .data(data);

    // Remove old bars
    bars.exit().remove();

    // Create new bars and update existing bars with transitions
    bars.enter()
        .append('rect')
        .attr('class', 'bar')
        .merge(bars)
        .transition()
        .duration(1000)
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d));

        await sleep(1000);
}




function algorithmUpdateBars(data) {
    // Update scales
    xScale.domain(data.map((d, i) => i));
    yScale.domain([0, d3.max(data)]).nice();

    // Update axes
    xAxis.call(d3.axisBottom(xScale).tickFormat(() => ''));
    yAxis.call(d3.axisLeft(yScale));

    // Bind data to bars
    const bars = svg.selectAll('.bar')
        .data(data);

    // Remove old bars
    bars.exit().remove();


    // Create new bars and update existing bars with transitions
    bars.enter()
        .append('rect')
        .attr('class', 'bar')
        .merge(bars)
        .transition()
        .duration(document.getElementById('timeDelay').value)
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d));
}












// Event listener for the shuffle button
document.getElementById('shuffleButton').addEventListener('click', () => {
    data = generateData();
    createAndUpdateBars(data);
});

// Event listeners for sort buttons
document.getElementById('bubbleSortButton').addEventListener('click', () => {
    bubbleSort(data);
});

document.getElementById('selectionSortButton').addEventListener('click', () => {
    selectionSort(data);
});

document.getElementById('insertionSortButton').addEventListener('click', () => {
    insertionSort(data);
});

document.getElementById('mergeSortButton').addEventListener('click', () => {
    mergeSort(data);
});

document.getElementById('quickSortButton').addEventListener('click', () => {
    quickSort(data, 0, data.length);
});

document.getElementById('heapSortButton').addEventListener('click', () => {
    heapSort(data);
});

document.getElementById('radixSortButton').addEventListener('click', () => {
    radixSort(data);
});

document.getElementById('bogoSortButton').addEventListener('click', () => {
    bogoSort(data);
});
