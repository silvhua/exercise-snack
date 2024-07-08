"use client"
import { useEffect, useState } from 'react';
import './ExerciseDetails.scss';
import Placeholder from '../Placeholder/Placeholder';
import TrainingFormElements from '../TrainingFormElements/TrainingFormElements';
import Button from '../Button/Button';
import { getExerciseDetails, getExerciseProperty } from '@/app/_libs/clientCrud';
import Video from '../Video/Video';

const ExerciseDetails = ({ exerciseId, onSubmit, handleInputChange }) => {
  const [exerciseObject, setExerciseObject] = useState(null);

  const retrieveExerciseDetails = async () => {
    const response = await getExerciseDetails(exerciseId);

    const arrayProperties = [
      'focus', 'context',
      'movement', 'muscle', 'environment', 'tip'
    ]
    if (response) {
      for (let i = 0; i < arrayProperties.length; i++) {
        const property = arrayProperties[i];
        response[property] = await getExerciseProperty(exerciseId, property);
      }
      
      setExerciseObject(response);
    }
  }
  useEffect(() => {
    retrieveExerciseDetails();
  }, [exerciseId]);

  if (!exerciseObject) {
    return <Placeholder text="fetching" />
  }
  
  const formButtonProps = {
    'text': 'Done!',
    onClick: onSubmit
  }

  const { id, name, src, ...detailsObject } = exerciseObject;

  return (
    <article key='details' className='exercise'>
      <h1>{name}</h1>
      <Video
        src={src}
        title={name}
      />
      
      <form onSubmit={onSubmit}>
        <TrainingFormElements handleInputChange={handleInputChange} />
        <Button buttonProps={formButtonProps} />
      </form>
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
