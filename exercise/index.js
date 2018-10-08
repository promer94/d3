const city = 'New York'
const width = 800
const height = 300

const margin = { top: 20, bottom: 20, left: 20, right: 20 }
const draw = city => {
  d3.tsv('data.tsv').then(data => { //eslint-disable-line
    /** Parse the data and format it */
    data.forEach(d => {
    d.date = d3.timeParse('%Y%m%d')(d.date) //eslint-disable-line
      d.date = new Date(d.date)
      d[city] = parseFloat(d[city])
    })
    /** Construct x axes */
  const xExtent = d3.extent(data, d => d.date) //eslint-disable-line
  const xScale = d3 //eslint-disable-line
      .scaleTime()
      .domain(xExtent)
      .range([margin.left, width - margin.right])

    /** Construct y axes */
  const [_,yMax] = d3.extent(data, d => d[city]) //eslint-disable-line
  const yScale = d3 //eslint-disable-line
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top])

    /** Construct height scale */
  const heightScale = d3 //eslint-disable-line
      .scaleLinear()
      .domain([0, yMax])
      .range([0, height - margin.top - margin.bottom])

  const xAxis = d3.axisBottom().scale(xScale) //eslint-disable-line
  const yAxis = d3.axisLeft().scale(yScale) //eslint-disable-line

  const graph = d3 //eslint-disable-line
      .select('svg')
      .on('click', function() {
        const mouse = d3.mouse(this) //eslint-disable-line
        console.log(mouse)
      })
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

  d3.select('svg') //eslint-disable-line
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)

  d3.select('svg') //eslint-disable-line
      .append('g')
      .attr('transform', `translate(${margin.left})`)
      .call(yAxis)

  d3.selectAll('g') //eslint-disable-line
      .selectAll('text')
      .style('color', 'red')
      .style('text-decoration', 'underline #FF3028')
  })
}
draw(city)
