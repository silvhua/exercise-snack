"use client"
import { useEffect, useState } from 'react';
import './ExerciseDetails.scss';
import { readExerciseDetails, readExerciseProperty } from '@/app/_libs/exerciseData';
import Placeholder from '../Placeholder/Placeholder';
import apiInstance from '@/app/_libs/ApiClient';
import { getExerciseDetails } from '@/app/_libs/clientCrud';

const ExerciseDetails = ({ exerciseId }) => {
  const [exerciseObject, setExerciseObject] = useState(null);

  const retrieveExerciseDetails = async () => { 
    const response = await getExerciseDetails(exerciseId);

    const arrayProperties = [
      'focus', 'context',
      'movement', 'muscle', 'environment', 'tip'
    ]
    if (response) {
      console.log(response)
      // for (let i = 0; i < arrayProperties.length; i++) {
      //   const property = arrayProperties[i];
      //   response[property] = await readExerciseProperty(exerciseId, property);
      // }
      
      setExerciseObject(response);
    }
  }
  useEffect(() => {
    retrieveExerciseDetails();
  }, [exerciseId]);

  if (!exerciseObject) {
    return <Placeholder text="fetching"/>
  }

  const { id, name, video, ...detailsObject } = exerciseObject;
  return (
    <article key='details' className='exercise'>
      
      <h1>{name}</h1>
      {
        Object.entries(detailsObject).map(([key, value]) => {
          if (value && typeof value === 'object') {
            const valuesArray = Object.values(value);
            
            return (
              <div key={key} className='exercise__property'>
                <h3>{key}</h3>
                <p>{valuesArray.map((element) => element[key]).join(', ')}</p>
              </div>
            )
          } else {
            return (
              <div key={key} className='exercise__property'>
                <h3>{key}</h3>
                <p>{value}</p>
              </div>
            )
          }
        })
      }
    </article>
  )
}

export default ExerciseDetails
