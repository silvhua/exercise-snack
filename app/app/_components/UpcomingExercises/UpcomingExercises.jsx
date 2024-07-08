"use client"

import { useEffect, useState } from 'react';
import './UpcomingExercises.scss';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import Button from '../Button/Button';
import { generateProgram } from '@/app/_libs/clientCrud';
import postData from "@/app/_libs/clientCrud";

const UpcomingExercises = ({ userObject }) => {
  const {
    username, first_name, userId
  } = userObject;
  const [programArray, setProgramArray] = useState(null);
  useEffect(() => {
    const getProgram = async () => {
      const response = await generateProgram();
      if (response) {
        setProgramArray(response)
      }
    }
    getProgram();
  }, [])
  if (!programArray) {
    return 'Awaiting response'
  }
  const nextExerciseId = programArray[0].id;

  const startTrainingHandler = async (event) => {
    const postSessionResponse = await postData('exercises', {userId: userId});
    console.log('post session response', postSessionResponse);

  }
  const buttonProps = {
    text: 'Start Snack',
    className: 'start-button',
    routerPath: `/training/${nextExerciseId}`,
    onClick: startTrainingHandler
  }

  return (
    <article className='upcoming-exercises'>
      <h2  className='headline6'>Upcoming Exercises</h2>
      <Button buttonProps={buttonProps} />
      <section className='card-container'>
        {
          programArray.map(exerciseObject => {
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
