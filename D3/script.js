var barData = [];
for (var i = 20 - 1; i >= 0; i--) {
	barData.push(Math.random()*30);
}
var svgHeight = 400,
	svgWidth = 600,
	barWidth = 50,
	barOffset = 5;

var yscale = d3.scaleLinear()
				.domain([0, d3.max(barData)])
				.range([0, svgHeight-10]);

var xscale = d3.scaleBand()
    			.domain(d3.range(0, barData.length))
    			.range([0, (svgWidth)])

 var colour = d3.scaleLinear()
 				.domain([0, barData.length*.33, barData.length*.66, barData.length])
 				.range(["orange", "red", "blue" , "aqua"]);

var mychart = d3.select('#chart')
				.append('svg')
					.attr('width',svgWidth)
					.attr('height',svgHeight)
					.selectAll('rect').data(barData)
					.enter().append('rect')
						.style('fill',function(d,i){
							return colour(i);
						})
						.attr('width', xscale.bandwidth())
						.attr('height',0)
						.attr('y',svgHeight)
						.attr('x',function (d,i) {
							return i * (xscale.bandwidth());
						})
					.on('mouseover', function (d) {
							d3.select(this)
							.transition()
							.style('opacity', .6)

						})
					.on('mouseout', function (d) {
							d3.select(this)
							.transition()
							.style('opacity', 1)
							
						});
					




mychart.transition().duration(600)
		.attr('height',function (d) {
			return yscale(d);
		})
		.attr('y',function (d) {
			return svgHeight - yscale(d);
		})
		.delay(function(d,i) {
			return i*20;
		})
		
	



