import ExerciseDetails from "../_components/ExerciseDetails/ExerciseDetails";
import ItemCard from "../_components/ItemCard/ItemCard";
import { getExercises, getExerciseDetails } from "../_libs/data";

export default async function Dashboard() {

  const exercises = await getExercises('push');

  const exerciseObject = await getExerciseDetails(exercises[0].id);
  console.log(exerciseObject)
  // console.log(exercises)
  return (
    <>
      <h1>Dashboard</h1>
      <ExerciseDetails exerciseObject={exerciseObject} />
      <article className='list'>
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
