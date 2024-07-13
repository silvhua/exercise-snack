"use client"

import Plot from 'react-plotly.js';

import './PlotComponent.scss';
import { formatDate, getMonthFromWeekNumber, getWeekOfYear } from '@/app/_libs/dataProcessing';
import { getLastSunday, getTimeSeries, timeSeries } from '@/app/_libs/TimeSeries';


const PlotComponent = ({ activityArray }) => {
  
  // Define your custom colorscale
  const customColorscale = [
    [0, 'rgba(242, 250, 250, 1)'],  // palest turquoise
    [0.5, 'rgba(199, 239, 239, 1)'], // turquoise
    [1, 'rgba(20, 37, 65, 1)']     // dark blue
  ];

  const dayOfWeekArray = [];
  const weekOfYearArray = [];
  const hoverTextArray = [];

  activityArray.forEach(object => {
    const date = object.date;
    /* 
    Subtract the day of the week from 6 so that Sun = 0, Sat = 6.
    This way, Sunday will be at the top of the x-axis instead of
    at the bottom.
    */
    const day = 6 - date.getDay(); 
    const week = timeSeries.getRecentSundayTimestamp(date);
    const hoverText = `${object.n_sets} sets on ${formatDate(date)}`;
    dayOfWeekArray.push(day);
    weekOfYearArray.push(week);
    hoverTextArray.push(hoverText);
  })

  // Create the xaxis labels which are month names
  const nWeeks = 26;
  const timeseriesArray = getTimeSeries(nWeeks);
  const xaxisValues = timeseriesArray.map(
    dateObject => timeSeries.dateToUnixTimestamp(dateObject)
  );


  /*
  Create xtick labels when a new month starts.
  Since `timeseriesArray` is in reverse chronological order BUT 
  we want the month label to be for the first week of that month, 
  we iterate `timeseriesArray` in reverse order to label the first
  week of a given month, then reverse the array so it matches the sequence of the
  data points.
  */
  let xlabels = [];
  for (let i = timeseriesArray.length - 1; i >= 0; i--) {
    const date = timeseriesArray[i];
    const month = formatDate(
      date, { month: 'short' }
    );
    if (xlabels.includes(month)) {
      xlabels.push('');
    } else {
      xlabels.push(month);
    }
  }
  xlabels = xlabels.reverse();

  const defaultWeeksToDisplay = 12;
  const layout = {
    xaxis: {
      range: [xaxisValues[defaultWeeksToDisplay], xaxisValues[0]],
      tickmode: 'array',
      tickvals: xaxisValues,
      ticktext: xlabels,
      showgrid: false,
    },
    yaxis: {
      fixedrange: true,
      showgrid: false,
      ticktext: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      tickvals: [6, 5, 4, 3, 2, 1, 0],
      range: [-0.5, 6.5],
      zeroline: false
    },
    autosize: true,
    margin: { //https://plotly.com/javascript/reference/layout/#layout-margin
      r: 32,
      l: 32,
      t: 32,
      b: 32
    },
    pad: 16,
    font: {
      // family: 'Open Sans', // Replace 'Your font family' with the desired font family
      color: 'rgb(20, 37, 65)' // Adjust the font color as needed
    },
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    plot_bgcolor: 'rgba(0, 0, 0, 0)'
  };
  

  // Prepare data for the plot
  const trace = {
    y: dayOfWeekArray,
    x: weekOfYearArray,
    mode: 'markers',
    text: hoverTextArray,
    hoverinfo: 'text',
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
    type: 'scatter'
  };

  /* 
  To make the plots responsive, need to pass a `config` prop and
  add `autosize: true` to `layout` prop
  https://github.com/plotly/react-plotly.js/blob/master/README.md#basic-props
*/
  const config = {
    responsive: true,
    modeBarButtonsToRemove: [
      'zoom2d', 'lasso2d'
    ],
    displaylogo: false
  };

  return (
    <section className='plot-container'>
      <Plot
        data={[trace]}
        layout={layout}
        config={config}
      />
    </section>
  );
};

export default PlotComponent

