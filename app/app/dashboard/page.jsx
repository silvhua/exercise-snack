import { redirect } from 'next/navigation'

import UpcomingExercises from "../_components/UpcomingExercises/UpcomingExercises";
import {getExercises} from "../_libs/exerciseData";

export default async function Dashboard({ userObject }) {

  if (!userObject) {
    redirect('/');
  }
  
  const { id, first_name, last_name, password } = userObject;

  const exercises = await getExercises('push');
  return (
    <>
      <h1 className="heading2">Hi, {first_name}</h1>
      <UpcomingExercises />
    </>
  );
}
