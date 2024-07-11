"use client"

import { useEffect, useState, useRef } from "react";
import UpcomingExercises from "../_components/UpcomingExercises/UpcomingExercises";
import Placeholder from "../_components/Placeholder/Placeholder";
import Button from "../_components/Button/Button";
import FilterIcon from "../_components/FilterIcon/FilterIcon";
import FilterMenu from "../_components/FilterMenu/FilterMenu";
import { generateProgram, updateProgram } from '@/app/_libs/clientCrud';
import { checkForSuccess } from '@/app/_libs/ApiClient';

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
  const userId = userObject?.id;
  
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

  async function handleFilterSubmit(event) {
    event.preventDefault();

    let sqlFilterStatements = [];

    for (const [property, propertyOptionObject] of Object.entries(checkboxValues)) {
      // console.log(`filter submitted\n`, property, propertyOptionObject);
          
      let column;
      switch (property) {
        case 'discreetness':
          column = 'level';
          break;
        default:
          column = 'name';
      }
      for (const [option, value] of Object.entries(propertyOptionObject)) {
        if (value) {
          sqlFilterStatements.push(`(${property}.${column} = "${option}")`)
        }
      }
    }
    const filterString = sqlFilterStatements.join(' AND ');
    const createProgramResponse = await generateProgram();
    if (checkForSuccess(createProgramResponse)) {
      setProgramArray(createProgramResponse);
      /* Save the newly generated program after filter form is submitted */
      const updateProgramResponse = await updateProgram(userId, createProgramResponse);
      console.log('updateProgramResponse', updateProgramResponse)
      if (checkForSuccess(updateProgramResponse)) {
        console.log('Program successfully edited');
      }
    } else {
      console.log('error:')
    }
    console.log('sqlFilter', filterString);

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
