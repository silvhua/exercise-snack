'use client'

import axios from "axios";

import apiInstance from "@/app/_libs/ApiClient";
// import './TrainingPage.scss';
import Button from "@/app/_components/Button/Button";
import TrainingFormElements from "@/app/_components/TrainingFormElements/TrainingFormElements";
import postData from "@/app/_libs/clientCrud";

const TrainingPage = ({ params }) => {
  const exerciseId = params.exerciseId;
  const userId = '446d0b20-e96b-4164-a591-b3566c6cefc7';
  
  const sessionObject = {
    userId: userId
  }
  
  // const exerciseObject = await getExerciseDetails(exerciseId);
  const formButtonProps = {
    'text': 'Done!',
    routerPath: '/'
  }

  const homeButtonProps = {
    'text': 'home',
    routerPath: '/'
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    // make api request here
    const postSessionResponse = await postData('/exercises', sessionObject);
    console.log('submitted', postSessionResponse);
    console.log('submitted');

  }

  return (
    <>
      ExerciseId: {exerciseId}
      <form onSubmit={onSubmit}>
        <TrainingFormElements />
        <Button buttonProps={formButtonProps} />
      </form>

      <Button buttonProps={homeButtonProps} />
    </>
  )
}

export default TrainingPage
