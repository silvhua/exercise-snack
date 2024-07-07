import { redirect } from 'next/navigation'

import UpcomingExercises from "../_components/UpcomingExercises/UpcomingExercises";
import {getExercises} from "../_libs/exerciseData";

export default async function Dashboard({ userObject }) {

  if (!userObject) {
    redirect('/');
  }
  
  const { id, username, first_name, last_name, password } = userObject;
  // const userProps = { 
  //   id: id,
  //   first_name: first_name
  // };

  return (
    <>
      <h1 className="heading2">Hi, {first_name}</h1>
      <UpcomingExercises username={username}  />
    </>
  );
}
