import { redirect } from 'next/navigation'

import Button from "../_components/Button/Button";
import UpcomingExercises from "../_components/UpcomingExercises/UpcomingExercises";
import {getExercises} from "../_libs/exerciseData";

export default async function Dashboard({ userObject }) {

  if (!userObject) {
    redirect('/');
  }
  
  const { id, first_name, last_name, password } = userObject;

  const exercises = await getExercises('push');
  const buttonProps = {
    text: 'Start Snack',
    className: 'start-button'
  }

  return (
    <>
      <h1 className="heading2">Hi, {first_name}</h1>
      <UpcomingExercises />
      <Button buttonProps={buttonProps} />
    </>
  );
}
