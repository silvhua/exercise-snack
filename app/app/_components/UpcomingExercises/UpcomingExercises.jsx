"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './UpcomingExercises.scss';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import Button from '../Button/Button';
import { generateProgram, getExerciseDetails } from '@/app/_libs/clientCrud';
import postData from "@/app/_libs/clientCrud";
import Placeholder from '../Placeholder/Placeholder';

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

  
  const [sessionObject, setSessionObject] = useState(null);
  const [placeholderText, setPlaceholderText] = useState('');
  useEffect(() => {
    const getProgram = async () => {
      const response = await generateProgram();
      if (response) {
        setProgramArray(response);
        localStorage.setItem('userProgram', JSON.stringify(response));
      } 
    }
    const storedProgram = JSON.parse(localStorage.getItem('userProgram'));
    if (!storedProgram) {
      setPlaceholderText('Creating your program...');
      getProgram();
    } else {
      setProgramArray(storedProgram);
      setPlaceholderText('Picking up where you left off...');
    }
  }, [])
  if (!programArray) {
    return <Placeholder text={placeholderText} />
  }
  const nextExerciseId = programArray[0].id;

  const startTrainingHandler = async (event) => {
    const postSessionResponse = await postData('sessions', { userId: id });
    if (!postSessionResponse.error) {
      setSessionObject(postSessionResponse);
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
