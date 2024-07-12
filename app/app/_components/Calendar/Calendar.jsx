import './Calendar.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = () => {
  return (
    <>
    <section className='calendar'>
      <Calendar 
        value={new Date()}
        onChange={() => { }}
        view='month'
      />
    </section>
    </>
  )
}

export default Calendar
