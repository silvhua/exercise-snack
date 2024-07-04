import ExerciseDetails from "../_components/ExerciseDetails/ExerciseDetails";
import ItemCard from "../_components/ItemCard/ItemCard";
import { getExercises, getExerciseDetails, getFocus, getCondition } from "../_libs/exerciseData";

export default async function Dashboard() {

  const exercises = await getExercises('push');

  const exerciseId = '3e2eafb9-0505-422b-8856-37bdc3640909';
  const exerciseObject = await getExerciseDetails(exerciseId);
  exerciseObject.focus = await getFocus(exerciseId);
  exerciseObject.condition = await getCondition(exerciseId);


  return (
    <>
      <h1>Dashboard</h1>
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
