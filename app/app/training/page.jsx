import ExerciseDetails from '../_components/ExerciseDetails/ExerciseDetails';
// import './Training.scss';
import {
  readExerciseDetails,
  readExerciseProperty
} from "../_libs/exerciseData";

const Training = async () => {

  const exerciseId = '36533d7e-63a4-4c57-b728-3efa873d3dac';
  const exerciseObject = await readExerciseDetails(exerciseId);

  const arrayProperties = [
    'focus', 'context',
    'movement', 'muscle', 'environment', 'tip'
  ]

  for (let i = 0; i < arrayProperties.length; i++) {
    const property = arrayProperties[i];
    exerciseObject[property] = await readExerciseProperty(exerciseId, property);
  }

  return (
    <>
      <h1 className="heading2">Training</h1>
      <ExerciseDetails exerciseObject={exerciseObject} />
    </>
  )
}

export default Training
