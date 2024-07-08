'use client'

// import './TrainingPage.scss';
import Button from "@/app/_components/Button/Button";
import TrainingFormElements from "@/app/_components/TrainingFormElements/TrainingFormElements";
import postData from "@/app/_libs/clientCrud";
import Link from "next/link";

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
    'text': 'Return to dashboard',
    href: '/dashboard'
  }

  const onSubmit = async (event) => {
    event.preventDefault();

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
