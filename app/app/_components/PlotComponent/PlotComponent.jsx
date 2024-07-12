"use client"

import Plot from 'react-plotly.js';

import './PlotComponent.scss';


const PlotComponent = () => {
  // Example usage
  const data = [
    { x: 'A', y: 10, value: 1 },
    { x: 'B', y: 15, value: 2 },
    { x: 'C', y: 20, value: 3 },
    { x: 'D', y: 25, value: 4 },
  ];
  
  // Define your custom colorscale
  const customColorscale = [
    [0, 'rgba(253, 253, 253, 1)'],  // off white
    [0.5, 'rgba(199, 239, 239, 1)'], // turquoise
    [1, 'rgba(20, 37, 65, 1)']     // dark blue
  ];

  // Prepare data for the plot
  const trace = {
    x: data.map(d => d.x),
    y: data.map(d => d.y),
    mode: 'markers',
    marker: {
      size: 10, // Size of the dots
      color: data.map(d => d.value), // Use the numeric value for color
      colorscale: customColorscale, // Use custom colorscale
      colorbar: {
        title: 'Value', // Colorbar title
      },
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