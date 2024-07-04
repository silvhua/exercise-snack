import { getExercises, getMovements } from '@/app/_libs/exerciseData';
import './UpcomingExercises.scss';

const UpcomingExercises = async () => {
  const movementCategories = await getMovements();
  const exerciseList = await movementCategories.map(async (category) => {
    const exercisesArray = await getExercises(category);
  })

  return (
    <ul>
    </ul>
  )
}

export default UpcomingExercises
