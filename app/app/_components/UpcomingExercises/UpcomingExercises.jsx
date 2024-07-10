"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './UpcomingExercises.scss';
import Button from '../Button/Button';
import postData, { generateProgram, readProgram, saveProgram } from '@/app/_libs/clientCrud';
import Placeholder from '../Placeholder/Placeholder';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import { checkForSuccess } from '@/app/_libs/ApiClient';

const UpcomingExercises = (props) => {
  const {
    userObject,
    programArray,
    setProgramArray
  } = props;

  const router = useRouter();
  const {
    username, first_name, id,
    // program
  } = userObject;

  const [placeholderText, setPlaceholderText] = useState('');
  
  useEffect(() => {

    const loadProgram = async () => {
      const storedProgramResponse = await readProgram(id);
      if (checkForSuccess(storedProgramResponse)) {
        const storedProgram = JSON.parse(storedProgramResponse.exercises);
        setProgramArray(storedProgram);
      } else {
        setPlaceholderText('Creating your program...');
        getNewProgram();
      }
    }

    const getNewProgram = async () => {
      const createProgramResponse = await generateProgram();
      if (checkForSuccess(createProgramResponse)) {
        setProgramArray(createProgramResponse);
        const postProgramResponse = await saveProgram(
          id, //user ID
          createProgramResponse
        );
        console.log('new program saved')
      } else {
        console.log('error:')
      }
    }

    if (!programArray) {
      loadProgram();
    } 
  }, [])

  if (!programArray) {
    return <Placeholder text={placeholderText} />
  }
  const nextExerciseId = programArray[0].id;

  const startTrainingHandler = async (event) => {
    const postSessionResponse = await postData('sessions', { userId: id });
    if (checkForSuccess(postSessionResponse)) {
      // session object is stored to sessionStorage so that the /training/:exerciseId page can use it
      sessionStorage.setItem('sessionDetails', JSON.stringify(postSessionResponse));
      router.push(`/training/${nextExerciseId}`);
    }
  }

  const buttonProps = {
    text: 'Start Snack',
    className: 'start-button',
    onClick: startTrainingHandler
  }

  return (
    <article className='upcoming-exercises'>
      <h2 className='headline6'>Upcoming Exercises</h2>
      <Button buttonProps={buttonProps} />
      <section className='card-container'>
        {
          programArray.map(exerciseObject => {
            const { id } = exerciseObject;
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
