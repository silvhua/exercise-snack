import { getExercises, getMovements } from '@/app/_libs/exerciseData';

import ItemCard from '../ItemCard/ItemCard';
// import './ExerciseLibrary.scss';

/* 
Retrieve all exercises and save them to an object where
there is a key per movement cateogry  name.
*/
const ExerciseLibrary = async () => {

  const movementCategories = await getMovements();
  const movementCategoryArray = movementCategories.map(object => object.name);
  
  const exercisesArrayObject = {}
  for (let i = 0; i < movementCategoryArray.length; i++) {
    const category = movementCategoryArray[i];
    exercisesArrayObject[category] = await getExercises(category);
  }
  const category = 'Hinge'
  const exercises = exercisesArrayObject[category];

  return (
    <>
      <article key='item-cards' className='list'>
        {exercises.map(object => {
          const { id, ...data } = object;
          return (
            <ItemCard key={object.id} data={ data } />
          )
        })}
      </article>
    </>
  )
}

export default ExerciseLibrary
