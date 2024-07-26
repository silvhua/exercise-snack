import { formatDate } from '@/app/_libs/dataProcessing';
import './ActivityCard.scss';

const ActivityCard = ({ activityObject }) => {
  let headingClassName = 'activity-card__heading';
  let cardClassName = 'activity-card';
  let textClassName = 'p1';
  if (!activityObject) {
    activityObject = {
    }
    headingClassName = 'activity-card__heading--header-row';
    cardClassName = 'activity-card--header-row';
    textClassName = 'display-none'
  }
  const {
    local_time,
    exercise,
    reps, duration, notes
  } = activityObject;
  
  return (
    <div className={cardClassName}>
      <div className='activity-card__top'>
        <h3 className='activity-card__date'>
          {local_time ? formatDate(local_time, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              timeZoneName: 'short',
            }
          ): ''}
        </h3>
        <div className='flex-column-div--no-gap'>
          <h4 className={headingClassName}>
            Exercise
          </h4>
          <p className={textClassName}>{exercise}</p>
        </div>
      </div>
      <div className='activity-card__middle'>
        <div className='flex-column-div--no-gap'>
          <h4 className={headingClassName}>
            reps
          </h4>
          <p className={textClassName}>{reps || '-'}</p>
        </div>
        <div className='flex-column-div--no-gap'>
          <h4 className={headingClassName}>
            duration
          </h4>
          <p className={textClassName}>{duration ? `${duration}` : '-'}</p> 
        </div>
      </div>
      <div className='activity-card__bottom'>
        <div className='flex-column-div--no-gap'>
          <h4 className={headingClassName}>
            notes
          </h4>
          <p className={textClassName}>
            {notes === 'null' ? '-' : notes || '-'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard
