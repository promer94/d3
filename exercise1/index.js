/* global d3 */
const city = 'New York'
const width = 800
const height = 500

const margin = { top: 40, bottom: 40, left: 40, right: 40 }
const draw = city => {
  d3.tsv('data.tsv').then(data => {
    /** Parse the data and format it */
    data.forEach(d => {
      d.date = d3.timeParse('%Y%m%d')(d.date)
      d.date = new Date(d.date)
      d[city] = parseFloat(d[city])
    })
    /** Construct x axes */
    const xExtent = d3.extent(data, d => d.date)
    const xScale = d3
      .scaleTime()
      .domain(xExtent)
      .range([margin.left, width - margin.right])
      .nice()

    /** Construct y axes */
    const [_, yMax] = d3.extent(data, d => d[city])  //eslint-disable-line
    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top])
      .nice()
    // In the browser, the coordination is different from the real world

    /** Construct height scale */
    const heightScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([0, height - margin.top - margin.bottom])
      .nice()

    /** Construct the axis and the format */
    const xAxis = d3
      .axisBottom()
      .scale(xScale)
      .tickFormat(d3.timeFormat('%b, %Y'))

    const yAxis = d3
      .axisLeft()
      .scale(yScale)
      .tickFormat(d => `${d} 🤣`)

    const graph = d3 //eslint-disable-line
      .select('svg')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', 2)
      .attr('height', d => heightScale(d[city]))
      .attr('x', d => xScale(d.date))
      .attr('y', d => yScale(d[city]))
      .attr('fill', 'blue')
      .attr('stroke', 'white')

    /** Move the axis to the right place */
    d3.select('svg')
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)

    d3.select('svg')
      .append('g')
      .attr('transform', `translate(${margin.left})`)
      .call(yAxis)

    d3.select('svg')
      .attr('width', width)
      .attr('height', height)
  })
}
draw(city)
