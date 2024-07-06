import { getExercisePerMovement, getExercises, getMovements } from '@/app/_libs/exerciseData';
import './UpcomingExercises.scss';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import ItemCard from '../ItemCard/ItemCard';

const UpcomingExercises = async () => {
  const exerciseArray = await getExercisePerMovement();

  return (
    <>
      <h1>Upcoming Exercises</h1>
      {
        exerciseArray.map(exerciseObject => {
          const { id } = exerciseObject;
          return (
            <ItemCard
              data={exerciseObject}
              key={id}
            />
            // <ExerciseCard
            //   exerciseObject={exerciseObject}
            //   key={id}
            // />
          )
        })
      }
    </>
  )
}

export default UpcomingExercises
