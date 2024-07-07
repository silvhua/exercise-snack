// import { getExercisePerMovement, getExercises, getMovements } from '@/app/_libs/exerciseData';
import program from '@/app/_libs/dataProcessing';
import './UpcomingExercises.scss';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import Button from '../Button/Button';

const UpcomingExercises = async () => {
  const exerciseArray = await program.getExercises();
  const nextExerciseId = exerciseArray[0].id;
  const buttonProps = {
    text: 'Start Snack',
    className: 'start-button',
    routerPath: `/training/${nextExerciseId}`
  }


  return (
    <article className='upcoming-exercises'>
      <h2  className='headline6'>Upcoming Exercises</h2>
      <Button buttonProps={buttonProps} />
      <section className='card-container'>
        {
          exerciseArray.map(exerciseObject => {
            const { id, random_number, ...filteredObject } = exerciseObject;
            return (
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
