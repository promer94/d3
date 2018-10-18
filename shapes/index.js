/* global d3 */
d3.tsv('data.tsv').then(data => {
  const width = 800
  const height = 500

  data = data.slice(0, 10)
  data.forEach(d => {
    d.date = d3.timeParse('%Y%m%d')(d.date)
    d.date = new Date(d.date)
    d['New York'] = parseFloat(d['New York'])
  })

  const margin = { top: 40, bottom: 40, left: 40, right: 40 }

  const xExtent = d3.extent(data, d => d.date)
  const xScale = d3
    .scaleTime()
    .domain(xExtent)
    .range([margin.left, width - margin.right])
    .nice()

  const [_, yMax] = d3.extent(data, d => d['New York']) //eslint-disable-line
  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([height - margin.bottom, margin.top])
    .nice()

  const heightScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([0, height - margin.top - margin.bottom])
    .nice()

  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .tickFormat(d3.timeFormat('%b, %Y'))

  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .tickFormat(d => `${d} 🤣`)

  const line = d3
    .line()
    .x(d => xScale(d.date))
    .y(d => heightScale(d['New York']))
    .curve(d3.curveStep)

  d3.select('svg')
    .append('path')
    .attr('d', line(data))
    .attr('fill', 'transparent')
    .attr('stroke', 'blue')

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

  const pieData = [1, 1, 2, 3, 5, 8, 13, 21]
  const pie = d3.pie()

  const arc = d3
    .arc()
    .innerRadius(50)
    .outerRadius(100)
    .startAngle(d => d.startAngle)
    .endAngle(d => d.endAngle)
    .padAngle(d => 0.04)

  const graph = d3
    .select('#svg2')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(200,200)')
  graph
    .selectAll('path')
    .data(pie(pieData, 200))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => d3.schemeAccent[d.index])
    .attr('stroke', '#FFF')
})
