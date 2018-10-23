/* global d3 */
const rectWidth = 20

const data = [[100, 250, 175, 200, 120], [250, 125, 360]]
const svg = d3.select('svg')

function updateBars(data) {
  const t = d3.transition().duration(1000)
  const margin = { top: 30, right: 30, bottom: 30, left: 30 }
  let bars = svg.selectAll('rect').data(data, (d, i) => `${d}+${i}`)

  const width = 100 + margin.left + margin.right
  const yScale = d3
    .scaleLinear()
    .domain([0, 360])
    .range([360 - margin.bottom, margin.top])

  const heightScale = d3
    .scaleLinear()
    .domain([0, 360])
    .range([0, 360 - margin.bottom - margin.top])

  const yAxis = d3.axisLeft().scale(yScale)

  svg.selectAll('g').remove()
  bars
    .exit()
    .transition(t)
    .attr('y', 360)
    .attr('height', 0)
    .remove()

  d3.select('svg')
    .append('g')
    .attr('transform', `translate(${margin.left})`)
    .call(yAxis)

  const enter = bars
    .enter()
    .append('rect')
    .attr('width', rectWidth)
    .attr('stroke', '#fff')

  bars = enter
    .merge(bars)
    .attr('x', (d, i) => margin.left + i * rectWidth + 5)
    .transition(t)
    .attr('y', d => yScale(d))
    .attr('height', d => heightScale(d))
    .attr('fill', (d, i) => d3.schemeAccent[i])

  svg.attr('height', 360 + margin.top + margin.bottom).attr('width', width)
}

let index = 0
setInterval(() => {
  updateBars(data[index % 2])
  index += 1
}, 2000)
