import { formatDate } from '@/app/_libs/dataProcessing';
import './ActivityCard.scss';

const ActivityCard = ({ activityObject }) => {
  const {
    id,
    created_time, local_time,
    exercise,
    reps, duration, notes
  } = activityObject;
  
  return (
    <div className='activity-card' >
      <h3 className='subtitle'>
        {formatDate(local_time, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
          }
        )}
      </h3>
      <p className='p1' key={`exercise-${id}`}>{exercise}</p>
      <p className='p1' key={`reps-${id}`}>Reps: {reps}</p>
      <p className='p1' key={`duration-${id}`}>Duration: {duration ? `${duration} sec` : null}</p>
      <p className='p1' key={`notes-${id}`}>
        Notes: {notes === 'null' ? '' : notes}
      </p>
    </div>
  )
}

export default ActivityCard
