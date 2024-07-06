// import { getExercisePerMovement, getExercises, getMovements } from '@/app/_libs/exerciseData';
import program from '@/app/_libs/processData';
import './UpcomingExercises.scss';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

const UpcomingExercises = async () => {
  const exerciseArray = await program.getExercises();

  return (
    <article className='upcoming-exercises'>
      <h2  className='headline6'>Upcoming Exercises</h2>
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
