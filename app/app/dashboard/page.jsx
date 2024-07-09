"use client"

import { useEffect, useState } from "react";
import UpcomingExercises from "../_components/UpcomingExercises/UpcomingExercises";
import Placeholder from "../_components/Placeholder/Placeholder";
import Button from "../_components/Button/Button";

export default function Dashboard() {
  const [userObject, setUserObject] = useState(null);
  
  useEffect(() => {
    setUserObject(JSON.parse(localStorage.getItem('userDetails')));
  }, []);

  if (!userObject) {
    return <Placeholder text='Verifying your details...' />
  }

  const buttonProps = {
    href: '/',
    text: 'Log out'
  }

  // userObject = {
  //   username: 'silvhua',
  //   first_name: 'Silvia',
  //   userId: '446d0b20-e96b-4164-a591-b3566c6cefc7'
  // }

  const { id, username, first_name, last_name, password } = userObject;
  return (
    <>
      <h1 className="heading2">Hi, {first_name}</h1>
      <UpcomingExercises userObject={userObject} />
      <Button buttonProps={buttonProps} />
    </>
  );
}
