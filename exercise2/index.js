/* global d3 */
const width = 800
const height = 600
const margin = { top: 30, right: 30, bottom: 30, left: 30 }
const radius = 10
const xScale = d3
  .scaleBand()
  .rangeRound([0, width])
  .paddingOuter(1)
  .paddingInner(1)
const yScale = d3
  .scaleLinear()
  .range([height - margin.top, margin.bottom])
  .nice()

const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

function update(data, year) {
  data = data.filter(d => d.year === year)
  const duration = d3.transition().duration(1000)
  // bind data with circle
  let circles = d3
    .select('svg')
    .attr('width', width + margin.left * 2)
    .attr('height', height)
    .selectAll('circle')
    .data(data, d => d.key)

  // remove the previous grap
  circles
    .exit()
    .transition(duration)
    .attr('r', 0)
    .attr('cy', 0)
    .remove()

  const text = d3
    .select('svg')
    .append('text')
    .attr('x', width - margin.left * 4)
    .attr('y', margin.top)
  // enter the circle
  const enter = circles
    .enter()
    .append('circle')
    .attr('r', radius)
  /* .on('mouseover', d => {
      text
        .exit()
        .attr('y', width + margin.left * 2)
        .transition(duration)
        .remove()
      text.merge(text).text(`The number is ${d.yield}`)
    } */

  // update the circle
  circles = enter
    .merge(circles)
    // .attr('cy', d => yScale(d.yield))
    .attr('cx', d => xScale(d.site))
    .attr('transform', `translate(${margin.left})`)
    .transition(duration)
    .attr('fill', d => colorScale(d.gen))
    .attr('cy', d => yScale(d.yield))
}
d3.csv('data.csv').then(data => {
  data.forEach(d => {
    d.year = parseFloat(d.year)
    d.yield = parseFloat(d.yield)
    d.key = `${d.site}:${d.gen}`
  })

  const xDomain = data.map(d => d.site)
  xScale.domain(xDomain)
  const [_, yMax] = d3.extent(data, d => d.yield) //eslint-disable-line
  yScale.domain([0, yMax])

  const xAxis = d3.axisBottom().scale(xScale)
  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(50)

  d3.select('svg')
    .append('g')
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
    .call(xAxis)

  d3.select('svg')
    .append('g')
    .attr('transform', `translate(${margin.left})`)
    .call(yAxis)

  const startYear = 1927
  const numYears = 9
  let index = 1
  update(data, startYear)
  setInterval(() => {
    update(data, startYear + (index % numYears))
    index += 1
  }, 4000)
})
