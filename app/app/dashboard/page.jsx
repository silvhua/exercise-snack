"use client"

import { useEffect, useState } from "react";
import UpcomingExercises from "../_components/UpcomingExercises/UpcomingExercises";
import Placeholder from "../_components/Placeholder/Placeholder";
import Button from "../_components/Button/Button";

export default function Dashboard() {
  const [userObject, setUserObject] = useState(null);
  const [programArray, setProgramArray] = useState(null);
  
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userDetails'));
    setUserObject(storedUserInfo);
  }, []);

  if (!userObject) {
    return <Placeholder text='Verifying your details...' />
  }
  // if (!programArray) {
  //   return <Placeholder text='Creating your program...' />
  // }

  const buttonProps = {
    href: '/',
    text: 'Log out'
  }

  const { id, username, first_name, last_name, password } = userObject;
  return (
    <>
      <h1 className="heading2">Hi, {first_name}</h1>
      <UpcomingExercises
        userObject={userObject}
        programArray={programArray}
        setProgramArray={setProgramArray}
     />
      <Button buttonProps={buttonProps} />
    </>
  );
}
