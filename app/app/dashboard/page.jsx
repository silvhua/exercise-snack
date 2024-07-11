"use client"

import { useEffect, useState, useRef } from "react";
import UpcomingExercises from "../_components/UpcomingExercises/UpcomingExercises";
import Placeholder from "../_components/Placeholder/Placeholder";
import Button from "../_components/Button/Button";
import FilterIcon from "../_components/FilterIcon/FilterIcon";
import FilterMenu from "../_components/FilterMenu/FilterMenu";

export default function Dashboard() {
  const [userObject, setUserObject] = useState(null);
  const [programArray, setProgramArray] = useState(null);
  const [checkboxValues, setCheckboxValues] = useState({
    'context': {}, 
    'environment': {},
    // 'discreetness': {},
    'focus': {}
  })
  const filterRef = useRef();
  
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userDetails'));
    setUserObject(storedUserInfo);
    const sessionProgramArray = sessionStorage.getItem('userProgram');
    setProgramArray(JSON.parse(sessionProgramArray));
  }, []);

  if (!userObject) {
    return <Placeholder text='Verifying your details...' />
  }

  const buttonProps = {
    href: '/',
    text: 'Log out'
  }

  function handleFilterClick (event) {
    filterRef.current.showModal(); 
  }

  function handleFilterSubmit(event) {
    event.preventDefault();
    console.log('filter submitted\n', checkboxValues);
  }

  const filterProps = {
    filterRef: filterRef,
    onSubmit: handleFilterSubmit,
    checkboxValues: checkboxValues,
    setCheckboxValues: setCheckboxValues
  }

  const { id, username, first_name, last_name, password } = userObject;
  return (
    <>
      <h1 className="heading2">Hi, {first_name}</h1>
      <p>Welcome to your dashboard</p>
      <div className="flex-row-container">
        <h2 className='headline6'>Upcoming Exercises</h2>
        <FilterIcon
          handleClick={handleFilterClick}
        />
      </div>
      <UpcomingExercises
        userObject={userObject}
        programArray={programArray}
        setProgramArray={setProgramArray}
     />
      <Button buttonProps={buttonProps} />
      <FilterMenu filterProps={filterProps} />
    </>
  );
}
