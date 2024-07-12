"use client"

import Plot from 'react-plotly.js';

import './PlotComponent.scss';
import { formatDate, getWeekOfYear } from '@/app/_libs/dataProcessing';


const PlotComponent = ({activityArray}) => {
  // Example usage
  const data = [
    { x: 'A', y: 10, value: 3 },
    { x: 'B', y: 15, value: 2 },
    { x: 'C', y: 20, value: 9 },
    { x: 'D', y: 25, value: 1 },
  ];
  
  // Define your custom colorscale
  const customColorscale = [
    [0, 'rgba(253, 253, 253, 1)'],  // off white
    [0.5, 'rgba(199, 239, 239, 1)'], // turquoise
    [1, 'rgba(20, 37, 65, 1)']     // dark blue
  ];

  const dayOfWeekArray = [];
  const weekOfYearArray = [];

  activityArray.forEach(object => {
    const date = object.date;
    const day = formatDate(date, { weekday: 'short' });
    const week = getWeekOfYear(date);
    dayOfWeekArray.push(day);
    weekOfYearArray.push(week);
    console.log(date, day, week);
  })


  // Prepare data for the plot
  const trace = {
    // x: data.map(d => d.x),
    // y: data.map(d => d.y),
    y: dayOfWeekArray,
    x: weekOfYearArray,
    mode: 'markers',
    marker: {
      size: 40, // Size of the dots
      color: activityArray.map(object => object.n_sets), // Use the numeric value for color
      colorscale: customColorscale, // Use custom colorscale
      cmin: 0,
      cmid: 1,
      cmax: 6,
      symbol:"square", //https://plotly.com/javascript/reference/scatter/#scatter-marker-symbol
      colorbar: {
        title: 'Value', // Colorbar title
      }
    },
    type: 'scatter',
  };

  const layout = {
    xaxis: {
      // title: 'X Axis',
    },
    yaxis: {
      // title: 'Y Axis',
    },
  };

  return (
    <Plot
      data={[trace]}
      layout={layout}
    />
  );
};

export default PlotComponent


/* 

        data={[
          {
            z: [
              [1, 2, 3, 2, 1], [2, 2, 3, 4, 5], [1, 2, 3, 4, 5],
              [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5],
              [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]
            ],
            x: [10, 20, 30, 40, 50],
            y: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sat', 'Sun'],
            type: 'heatmap',
            mode: 'markers',
            marker: {color: 'red'},
          }
        ]}
*/