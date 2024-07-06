import { getExercises, getMovements } from '@/app/_libs/exerciseData';
// import './ExerciseLibrary.scss';

/* 
Retrieve all exercises and save them to an object where
there is a key per movement cateogry  name.
*/
const ExerciseLibrary = async () => {

  const movementCategories = await getMovements();
  const movementCategoryArray = movementCategories.map(object => object.name);
  console.log(movementCategoryArray);
  const exercisesArrayObject = {}
  for (let i = 0; i < movementCategoryArray.length; i++) {
    const category = movementCategoryArray[i];
    exercisesArrayObject[category] = await getExercises(category);
  }

  return (
    <>
    </>
  )
}

export default ExerciseLibrary
