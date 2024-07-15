"use client"

import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
import postData, { generateProgram, readProgram, saveProgram } from '@/app/_libs/clientCrud';
import Placeholder from '../Placeholder/Placeholder';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import { checkForSuccess } from '@/app/_libs/ApiClient';
import rotateArray from '@/app/_libs/dataProcessing';

const UpcomingExercises = (props) => {
  /* 
  This component does the following:
  1. Searches the database for an existing program for this user. 
  If it doesn't exist, it will generate a new program for this user.
  2. Checks the localStorage for the ID of the last logged exercise.
  If it matches the ID of the first exercise in the current programArray,
  it will rotate the exercises within the array.
  */
  const {
    userObject,
    programArray, setProgramArray,
    placeholderText, discreetnessArray
  } = props;

  const router = useRouter();
  const {
    username, first_name, id,
  } = userObject;

  if (!programArray) {
    return <Placeholder text={placeholderText} />
  }
  const nextExerciseId = programArray[0].id;
  const latestExerciseId = localStorage.getItem('latestExerciseId');
  if (latestExerciseId === nextExerciseId) {
    // Rotate the exercises 
    rotateArray(programArray);
  }

  const startTrainingHandler = async (event) => {
    const postSessionResponse = await postData('sessions', { userId: id });
    if (checkForSuccess(postSessionResponse)) {
      // session object and program array is stored to sessionStorage so that the /training page can use it
      sessionStorage.setItem('sessionDetails', JSON.stringify(postSessionResponse));
      sessionStorage.setItem('userProgram', JSON.stringify(programArray));
      router.push(`/training`);
    }
  }

  /* 
  Convert the array of discreetnessValues into an object for fast look up
  */
  const discreetnessMapping = {}
  for (let i = 0; i < discreetnessArray.length; i++) {
    const { level, description} = discreetnessArray[i];
    discreetnessMapping[level] = description;
  }

  const buttonProps = {
    text: 'Start Snack',
    className: 'start-button',
    onClick: startTrainingHandler
  }

  return (
    <article className='upcoming-exercises'>
      <Button buttonProps={buttonProps} />
      <section className='card-container'>
        {
          programArray.map(exerciseObject => {
            const { id } = exerciseObject;
            const discreetnessText = discreetnessMapping[exerciseObject.discreetness];
            return (
              <ExerciseCard
                exerciseObject={exerciseObject}
                key={id}
                discreetnessText={discreetnessText}
              />
            )
          })
        }
      </section>
    </article>
  )
}

export default UpcomingExercises
