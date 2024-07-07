// import './TrainingPage.scss';

import Button from "@/app/_components/Button/Button";
import TrainingFormElements from "@/app/_components/TrainingFormElements/TrainingFormElements";

const TrainingPage = async ({ params }) => {
  const exerciseId = params.exerciseId;

  const buttonProps = {
    'text': 'home',
    routerPath: '/'
  }

  return (
    <>
      ExerciseId: {exerciseId}
      <form>
        <TrainingFormElements />
      </form>
      <Button buttonProps={buttonProps} />
    </>
  )
}

export default TrainingPage
