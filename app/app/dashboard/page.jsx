import ItemCard from "../_components/ItemCard/ItemCard";
import { getExercises } from "../_libs/data";

export default async function Dashboard() {

  const exercises = await getExercises('push');
  return (
    <>
      <h1>Dashboard</h1>
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
