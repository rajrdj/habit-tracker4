import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HabitChart = ({ habit }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (habit && habit.status) {
      drawChart();
    }
  }, [habit]);

  const drawChart = () => {
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Clear any existing SVG
    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleBand()
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height - margin.bottom, margin.top]);

    const lastSevenDays = habit.status
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7)
      .reverse();

    x.domain(lastSevenDays.map(d => new Date(d.date).toLocaleDateString()));
    y.domain([0, 1]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.selectAll(".bar")
      .data(lastSevenDays)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(new Date(d.date).toLocaleDateString()))
      .attr("y", d => y(d.value === 'done' ? 1 : 0))
      .attr("width", x.bandwidth())
      .attr("height", d => height - margin.bottom - y(d.value === 'done' ? 1 : 0))
      .attr("fill", d => d.value === 'done' ? "green" : (d.value === 'not done' ? "red" : "gray"));
  };

  return <div ref={chartRef}></div>;
};

export default HabitChart;