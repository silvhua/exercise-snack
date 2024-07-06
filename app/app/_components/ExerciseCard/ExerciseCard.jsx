import './ExerciseCard.scss';

const ExerciseCard = async ({ exerciseObject }) => {
  console.log(exerciseObject.id, 'exercise card')
  const { id, name, movement_category } = exerciseObject;
  return (
    <li className='upcoming__card'>
      <h3>{name}</h3>
      <p>{movement_category}</p>
    </li>
  )
}

export default ExerciseCard
 