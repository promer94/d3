/* global d3 */
let data = [100, 40, 15]

let height = 120
let width = height
let radius = height * 0.4
let hole = radius * 0.5
let positiveColorRange = d3
  .scaleLinear()
  .range(['#7CD5FD', '#6D95FF'])
  .domain([0, 1])
let normalColorRange = d3
  .scaleLinear()
  .range(['#FF9461', '#FDDE7D'])
  .domain([0, 1])
let negativeColorRange = d3
  .scaleLinear()
  .range(['#F24343', '#FF903C'])
  .domain([0, 1])

let color = [
  d3.scaleSequential(positiveColorRange),
  d3.scaleSequential(normalColorRange),
  d3.scaleSequential(negativeColorRange)
]
let svg = d3
  .select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

let arcFill = svg
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + width / 2 + ')')

let arcOutline = svg
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + width / 2 + ')')

let arc = d3
  .arc()
  .innerRadius(hole)
  .outerRadius(radius)
let pie = d3
  .pie()
  .sort(null)
  .value(function(d) {
    return d
  })

data = pie(data)

arcOutline
  .selectAll('.arc')
  .data(data)
  .enter()
  .append('path')
  .attr('class', 'arc')
  .attr('d', arc)
  .style('fill', function(d) {
    return createGradient(d)
  })
  .style('stroke', 'white')
  .style('stroke-width', '3px')

function createGradient(d) {
  let miniArcs = []
  let angleExtent = d.endAngle - d.startAngle
  let noOfArcs = angleExtent * 75 // seems like a good number

  color[d.index].domain([0, noOfArcs])
  let miniArcAngle = angleExtent / noOfArcs

  for (let j = 0; j < noOfArcs; j++) {
    let miniArc = {}
    miniArc.startAngle = d.startAngle + miniArcAngle * j
    // 0.01 so the colours overlap slightly, so there's no funny artefacts.
    miniArc.endAngle = miniArc.startAngle + miniArcAngle + 0.01
    // unless it goes beyond the end of the parent arc
    miniArc.endAngle =
      miniArc.endAngle > d.endAngle ? d.endAngle : miniArc.endAngle
    miniArcs.push(miniArc)
  }

  arcFill
    .selectAll('.mini-arc')
    .data(miniArcs)
    .enter()
    .append('g')
    .append('path')
    .attr('class', 'arc')
    .attr('d', arc)
    .style('fill', function(a, i) {
      return color[d.index](i)
    })

  return 'none'
}
