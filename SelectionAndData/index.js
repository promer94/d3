/* global d3 */
const data = [100, 500, 175, 250, 120]
const rectWidth = 30
/** get min/max */
const [_, max] = d3.extent(data) //eslint-disable-line

const margin = { top: 20, bottom: 20, left: 30, right: 30 }
const width = margin.left + margin.right + data.length * rectWidth
const height = d3.max(data)
/** Scale */

const yScale = d3
  .scaleLinear()
  .domain([0, max])
  .range([height - margin.bottom, margin.top])

const heightScale = d3
  .scaleLinear()
  .domain([0, max])
  .range([0, height - margin.bottom - margin.top])
/** Axes */
const yAxis = d3.axisLeft().scale(yScale)

d3.select('#graph')
  .append('g')
  .attr('transform', `translate(${margin.left})`)
  .call(yAxis)

d3.select('#graph')
  .attr('width', width)
  .attr('height', 500)
  .selectAll('rect')
  .data(data) // bind the data to the element
  .enter() // Create placeholder
  .append('rect') // create rect element
  .attr('x', (d, i) => margin.left + i * rectWidth)
  .attr('y', d => yScale(d))
  .attr('width', rectWidth)
  .attr('height', d => heightScale(d))
  .attr('fill', d => (d === 250 ? 'red' : 'blue'))
  .attr('stroke', '#fff')
  .on('mouseover', d => (document.getElementById('number').innerText = d))
