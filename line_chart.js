// !preview r2d3 data=data
//
// r2d3: https://rstudio.github.io/r2d3
//

margin = ({top: 20, right: 30, bottom: 30, left: 40})

x = d3.scaleTime()
    .domain(
      d3.extent(data, function(d) { 
       return new Date(d.date_added2); 
      })
    )
    .range([margin.left, width - margin.right])
    
y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.n)]).nice()
    .range([height - margin.bottom, margin.top])
    

xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 60).tickSizeOuter(0))
    
yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
        

 line = d3.line()
    .x(d => x(new Date(d.date_added2)))
    .y(d => y(parseFloat(d.n)))
  

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  let red_line = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr('stroke', 'crimson')
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);



    
