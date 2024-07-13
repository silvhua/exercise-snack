"use client"

import Plot from 'react-plotly.js';

import './PlotComponent.scss';
import { formatDate, getMonthFromWeekNumber, getWeekOfYear } from '@/app/_libs/dataProcessing';
import { getLastSunday, getTimeSeries, timeSeries } from '@/app/_libs/TimeSeries';


const PlotComponent = ({ activityArray }) => {
  
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
    const week = timeSeries.getRecentSundayTimestamp(date);
    dayOfWeekArray.push(day);
    weekOfYearArray.push(week);
  })

  // Create the xaxis labels which are month names
  const nWeeks = 4
  const timeseriesArray = getTimeSeries(nWeeks);
  const xaxisValues = timeseriesArray.map(
    dateObject => timeSeries.dateToUnixTimestamp(dateObject)
  );


  let xlabels = timeseriesArray.map(date => {
    const month = formatDate(
      date, { month: 'short' }
    );
    return month;
  });

  const layout = {
    xaxis: {
      range: [xaxisValues[nWeeks], xaxisValues[0]],
      tickmode: 'array',
      tickvals: xaxisValues,
      ticktext: xlabels
    },
    yaxis: {
      // title: 'Y Axis',
    },
    width: 800
  };
  

  // Prepare data for the plot
  const trace = {
    y: dayOfWeekArray,
    x: weekOfYearArray,
    mode: 'markers',
    marker: {
      size: 20, // Size of the dots
      color: activityArray.map(object => object.n_sets), // Use the numeric value for color
      colorscale: customColorscale, // Use custom colorscale
      cmin: 0,
      cmid: 1,
      cmax: 6,
      symbol: "square", //https://plotly.com/javascript/reference/scatter/#scatter-marker-symbol
      // colorbar: {
      //   title: 'Value', // Colorbar title
      //   orientation: 'h'
      // }
    },
    type: 'scatter',
  };

  return (
    <Plot
      data={[trace]}
      layout={layout}
    />
  );
};

export default PlotComponent

