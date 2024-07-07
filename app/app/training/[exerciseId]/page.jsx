'use client'
// import './TrainingPage.scss';

import Button from "@/app/_components/Button/Button";
import TrainingFormElements from "@/app/_components/TrainingFormElements/TrainingFormElements";

const TrainingPage = ({ params }) => {
  const exerciseId = params.exerciseId;
  console.log('training page')
  // const exerciseObject = await getExerciseDetails(exerciseId);
  const formButtonProps = {
    'text': 'Done!',
    routerPath: '/'
  }

  const homeButtonProps = {
    'text': 'home',
    routerPath: '/'
  }

  const onSubmit = (event) => {
    event.preventDefault();
    // make api request here
    console.log('submitted')

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
