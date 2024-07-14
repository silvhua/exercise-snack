"use client"

import { useState, useRef, useContext } from "react";
import { DataContext } from "@/app/context-provider";
import UpcomingExercises from "@/app/_components/UpcomingExercises/UpcomingExercises";
import Placeholder from "@/app/_components/Placeholder/Placeholder";
import Button from "@/app/_components/Button/Button";
import FilterIcon from "@/app/_components/FilterIcon/FilterIcon";
import FilterMenu from "@/app/_components/FilterMenu/FilterMenu";
import {
  generateProgram, updateProgram
} from '@/app/_libs/clientCrud';
import { checkForSuccess } from '@/app/_libs/ApiClient';
import Streak from "@/app/_components/Streak/Streak";
import './dashboard.scss'

export default function Dashboard() {
  const context = useContext(DataContext);
  const {
    userObject, 
    streakValue, 
    recentSessions, 
    programArray, setProgramArray
  } = context;

  const [checkboxValues, setCheckboxValues] = useState({
    'context': {}, 
    'environment': {},
    // 'discreetness': {},
    // 'focus': {}
  })

  const filterRef = useRef();
  const userId = userObject?.id;

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
          sqlFilterStatements.push(`(${property}.${column} LIKE "${option}")`)
        }
      }
    }
    let filterString = sqlFilterStatements.join(' AND ');
    filterString = encodeURIComponent(filterString);
    const createProgramResponse = await generateProgram(filterString);
    if (checkForSuccess(createProgramResponse)) {
      setProgramArray(createProgramResponse);
      /* Save the newly generated program after filter form is submitted */
      const updateProgramResponse = await updateProgram(userId, createProgramResponse);
      console.log('updateProgramResponse', updateProgramResponse)
      if (checkForSuccess(updateProgramResponse)) {
        console.log('Program successfully edited');
        filterRef.current.close();
      }
    } else {
      console.log('error:')
    }

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
      <section className="responsive-section">
        <div className="title-container">
          <h1 className="heading2">Hi, {first_name}</h1>
          <p>Welcome to your dashboard</p>
        </div>
        <div className="flex-column-div">
        
          {
          streakValue ?
            <h3 className="streak__text">
              <span className="streak__number">
                {streakValue.consecutive_days}
              </span> days streak 
            </h3>
            : ''
          }
          {
            recentSessions ?
              <Streak
                data={recentSessions}
                interval={7}
              />
            : null
          }
        </div>
      </section>
      <div className="flex-row-container">
        <h2 className='headline6'>Upcoming Exercises</h2>
        <FilterIcon
          handleClick={handleFilterClick}
        />
      </div>
      {
        programArray ? 
          <>
            <UpcomingExercises
              userObject={userObject}
              programArray={programArray}
              setProgramArray={setProgramArray}
            />
            <Button buttonProps={buttonProps} />
            <FilterMenu filterProps={filterProps} />
          </>
          : null
      }
    </>
  );
}
