import { timeSeries } from '@/app/_libs/TimeSeries';
import './ConsistencyDisplay.scss';

const ConsistencyDisplay = ({activityArray, firstSession}) => {
  const oneWeekAgo = timeSeries.nDaysAgoDate(7);
  const oneMonthAgo = timeSeries.nMonthsAgoDate(1);

  

  function showConsistencyStat(startDate, text, activityArray) {
    const interval = timeSeries.daysSince(startDate);
      const relevantActivtyDates = activityArray.filter(activity => activity.date > startDate
    );
    const uniqueDates = new Set(relevantActivtyDates);
    const precentActivityDays = Math.round(
      uniqueDates.size / interval * 100
    );
    return (
      <li>
        <p>
          {precentActivityDays}% {text}
        </p>
      </li>
    )
  }

  return (
    <div className='flex-column-div'>
      <h2 className='headline6'>Your consistency</h2>
      <ul>
        {
          showConsistencyStat(oneWeekAgo, 'in the past week', activityArray)
        }
        {
          oneMonthAgo >= firstSession ?
            showConsistencyStat(oneMonthAgo, 'in the past month', activityArray) :
            null
        }
        {
          showConsistencyStat(firstSession, 'overall', activityArray)
        }

      </ul>

    </div>
  )
}

export default ConsistencyDisplay
