// import './TrainingPage.scss';

const TrainingPage = async ({ params }) => {
  const exerciseId = params.exerciseId;
  return (
    <>
      ExerciseId: {exerciseId}
    </>
  )
}

export default TrainingPage
