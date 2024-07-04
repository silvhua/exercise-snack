import { getExercises } from "../libs/data";

export default async function Dashboard() {

  const exercises = await getExercises('hinge');
  console.log(exercises[0])
  return (
    <>
      <h1>Dashboard</h1>
      <article>
        {exercises.map(object => {
          const { name } = object;
          return (
            <p>{name}</p>
          )
        })}
      </article>
    </>
  );
}
