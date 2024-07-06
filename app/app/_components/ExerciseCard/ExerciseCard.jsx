import './ExerciseCard.scss';

const ExerciseCard = async ({ exerciseObject }) => {
  const { id, name, movement } = exerciseObject;
  /* 
  - movement category: text
  - discreetness: 1 number
  - condition: 1+ icons
  - focus: 1+ icons
  - environment: 1+ icons

  */
  return (
    <li className='exercise-card'>
      <h3 className='subtitle'>{movement}</h3>
      <p>{name}</p>
    </li>
  )
}

export default ExerciseCard
 