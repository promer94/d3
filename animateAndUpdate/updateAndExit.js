/* global d3 */
const data = [100, 200, 300, 400, 500]

let bar = d3
  .select('svg')
  .selectAll('rect')
  .data(data, d => d) // It will return the update selection

bar.exit() // It will return the exit selection, then you can use remove()

const enter = bar
  .enter()
  .append('rect')
  .attr('width', 20)
  .attr('stroke', '#fff')
  .attr('fill', 'red')

bar = enter
  .merge(bar)
  .attr('x', (d, i) => i * 20)
  .attr('y', d => 800 - d)
