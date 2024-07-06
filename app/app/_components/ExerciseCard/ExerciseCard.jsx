import './ExerciseCard.scss';

const ExerciseCard = async ({ exerciseObject }) => {
  const { id, name, movement_category } = exerciseObject;
  return (
    <li className='exercise-card'>
      <h3>{name}</h3>
      <p>{movement_category}</p>
    </li>
  )
}

export default ExerciseCard
 