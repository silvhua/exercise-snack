import { formatDate } from '@/app/_libs/dataProcessing';
import './ActivityCard.scss';

const ActivityCard = ({ activityObject }) => {
  const {
    id,
    date, n_sets,
    // created_time, local_time,
    // exercise,
    // reps, duration, notes
  } = activityObject;
  
  return (
    <div className='activity-card'>
      <h3 className='subtitle'>
        {formatDate(date, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
          }
        )}
      </h3>
      <p className='p1'>{n_sets} sets</p>
      {/* {created_time} ({local_time})
      {exercise}
      {reps}
      {duration}
      {notes} */}
    </div>
  )
}

export default ActivityCard
