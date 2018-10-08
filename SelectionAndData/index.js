const data = [100, 250, 175, 200, 120]
const height = 300
const rectWidth = 30
/** get min/max */
const [min, max] = d3.extent(data) //eslint-disable-line

/** Scale */
const yScale = d3 //eslint-disable-line
  .scaleLinear()
  .domain([min, max])
  .range([height, 0])

/** Axes */
const yAxis = d3.axisLeft().scale(yScale) //eslint-disable-line

const a = d3 //eslint-disable-line
  .select('#graph')
  .append('g') //eslint-disable-line
  .attr('transform', 'translate(40,20)')
  .call(yAxis)

const graph = d3 // eslint-disable-line
  .select('#graph')
  .attr('width', rectWidth * data.length)
  .attr('height', 500) // eslint-disable-line
/* .selectAll('rect')
  .data(data) // bind the data to the element
  .enter() // Create placeholder
  .append('rect') // create rect element
  .attr('x', (d, i) => i * rectWidth)
  .attr('y', d => height - d)
  .attr('width', rectWidth)
  .attr('height', d => d)
  .attr('fill', d => (d === 250 ? 'red' : 'blue'))
  .attr('stroke', '#fff')
  .on('click', d => (document.getElementById('number').innerText = d)) */
