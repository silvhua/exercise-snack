import { getExercisePerMovement, getExercises, getMovements } from '@/app/_libs/exerciseData';
import './UpcomingExercises.scss';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import ItemCard from '../ItemCard/ItemCard';

const UpcomingExercises = async () => {
  const exerciseArray = await getExercisePerMovement();

  return (
    <article className='upcoming-exercises'>
      <h1>Upcoming Exercises</h1>
      <section className='card-container'>
        {
          exerciseArray.map(exerciseObject => {
            const { id, random_number, ...filteredObject } = exerciseObject;
            return (
              // <ItemCard
              //   data={filteredObject}
              //   key={id}
              // />
              <ExerciseCard
                exerciseObject={exerciseObject}
                key={id}
              />
            )
          })
        }
      </section>
    </article>
  )
}

export default UpcomingExercises
