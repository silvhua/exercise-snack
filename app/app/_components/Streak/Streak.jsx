import './Streak.scss';
import 'react-calendar/dist/Calendar.css';
import ActionIcon from '../ActionIcon/ActionIcon';
import { createDatesArray, formatDate } from '@/app/_libs/dataProcessing';

const Streak = ({ data, interval }) => {

  function StreakUnit({ iconProps }) {
    const { label } = iconProps;

    return (
      <div className='streak__day'>
        <p className='p2'>{label}</p>
        <ActionIcon
          iconProps={iconProps}
        />
      </div>
    )
  }
  
  /* 
  Dates need to be normalized to determine 
  which of the past few days have logged sessions
  */
  const pastDates = createDatesArray(interval);
  const normalizedSessionDates = data.map(session => {
    let sessionDate = new Date(session.date)
    sessionDate.setHours(0, 0, 0, 0)
    sessionDate = sessionDate.getTime();
    return sessionDate;
  })

  let iconProps = {
    className: 'streak__icon',
    href: null
  }
  return (
    <div className='streak'>
      {
        pastDates.map((date, index) => {
          const sessionLogged = normalizedSessionDates.includes(date.getTime());
          const weekdayString = formatDate(
            date, { weekday: 'narrow' }
          )
          let img = '';
          sessionLogged ? img = 'checkCircleFilled.svg' : img = 'radioButtonUnchecked.svg';
          const imgSrc = `./icons/${img}`;
          iconProps = {
            ...iconProps,
            src: imgSrc,
            label: weekdayString
          }
          return (
            <StreakUnit
              key={index}
              iconProps={iconProps}
            />
          )
        })
      }
    </div>
  )
}

export default Streak
