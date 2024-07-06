import ExerciseDetails from "../_components/ExerciseDetails/ExerciseDetails";
import ItemCard from "../_components/ItemCard/ItemCard";
import UpcomingExercises from "../_components/UpcomingExercises/UpcomingExercises";
import {
  getExercises, getExerciseDetails, getFocus, getCondition,
  getExerciseProperty
} from "../_libs/exerciseData";

export default async function Dashboard() {

  const exercises = await getExercises('push');

  const exerciseId = '36533d7e-63a4-4c57-b728-3efa873d3dac';
  const exerciseObject = await getExerciseDetails(exerciseId);

  const arrayProperties = [
    'focus', 'condition',
    'movement', 'muscle', 'environment', 'tip'
  ]

  for (let i = 0; i < arrayProperties.length; i++) {
    const property = arrayProperties[i];
    exerciseObject[property] = await getExerciseProperty(exerciseId, property);
    console.log(property, exerciseObject[property])
  }


  return (
    <>
      <h1>Dashboard</h1>
      <UpcomingExercises />
      <ExerciseDetails exerciseObject={exerciseObject} />
      <article key='cards' className='list'>
        {exercises.map(object => {
          const { id, ...data } = object;
          return (
            <ItemCard key={object.id} data={ data } />
          )
        })}
      </article>
    </>
  );
}
