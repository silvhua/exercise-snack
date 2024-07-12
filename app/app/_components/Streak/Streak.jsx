import Calendar from 'react-calendar';
import './Streak.scss';
import 'react-calendar/dist/Calendar.css';
import ActionIcon from '../ActionIcon/ActionIcon';

const Streak = () => {

  const circleProps = {
    src: './icons/radioButton.svg',
    className: 'streak__icon',
    href: null,
    label: 'M'
  }
  const checkMarkProps = {
    src: './icons/checkCircle.svg',
    className: 'streak__icon',
    href: null,
    label: 'M'
  }

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

  return (
    <div className='streak'>
      <StreakUnit iconProps={checkMarkProps} />
      <StreakUnit iconProps={circleProps} />
      {/* <ActionIcon
        iconProps={checkMarkProps}
      /> */}
    </div>
  )
}

export default Streak
