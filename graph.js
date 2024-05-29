// Initial data generation
let data = generateData();

// Define the dimensions and margins for the chart
const margin = { top: 20, right: 30, bottom: 40, left: 40 };
const width = 1000 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

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
