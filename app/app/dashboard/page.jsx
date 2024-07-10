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
  const [filterShown, setFilterShown] = useState(false);
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
    console.log('Filter clicked');
    // filterRef.current.showModal();
    setFilterShown(!filterShown);
    
  }

  const filterProps = {
    filterRef: filterRef,
    filterShown: filterShown,
    setFilterShown: setFilterShown
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
      {filterShown ? 
      <FilterMenu filterProps={filterProps} />
      : null
      }
    </>
  );
}
