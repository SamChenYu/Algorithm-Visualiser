        // Generate an array of unique numbers from 1 to 100 and shuffle it
        const data = Array.from({ length: 100 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

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
        const xScale = d3.scaleBand()
            .domain(data.map((d, i) => i))
            .range([0, width])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .nice()
            .range([height, 0]);

        // Create and append the x axis
        svg.append('g')
            .attr('class', 'axis-x')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).tickFormat(() => ''));

        // Create and append the y axis
        svg.append('g')
            .attr('class', 'axis-y')
            .call(d3.axisLeft(yScale));

        // Create and append the bars
        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d, i) => xScale(i))
            .attr('y', d => yScale(d))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d));
