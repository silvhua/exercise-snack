'use client'

// import './TrainingPage.scss';
import { useState, useEffect } from "react";
import Button from "@/app/_components/Button/Button";
import TrainingFormElements from "@/app/_components/TrainingFormElements/TrainingFormElements";
import postData from "@/app/_libs/clientCrud";
import ExerciseDetails from "@/app/_components/ExerciseDetails/ExerciseDetails";

const TrainingPage = ({ params }) => {
  const exerciseId = params.exerciseId;
  const userId = '446d0b20-e96b-4164-a591-b3566c6cefc7';
  const [formData, setFormData] = useState({
    reps: null,
    duration: null,
    notes: null
  });
  const [errorState, setErrorState] = useState({
    reps: null,
    duration: null
  });
  const [exerciseDetailsComponent, setExerciseDetailsComponent] = useState(null);
  
  const sessionObject = {
    userId: userId
  }

  // const renderExerciseDetails = () => {
  //   setExerciseDetailsComponent(<ExerciseDetails exerciseId={exerciseId} />);
  // }

  // useEffect(() => {
  //   renderExerciseDetails();
  // }, [exerciseId])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target)
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorState({
      ...errorState,
      [name]: null,
    });
  }

  const validateForm = async () => {
    let errors = {};
    errors = {
      reps: formData.reps < 0,
      duration: formData.duration < 0
    }
    setErrorState(errors);
    const propertiesWithErrors = Object.keys(errors).filter((key) => {
      return errors[key] == true;
    });
    const isValid = !Object.values(errors).includes(true);
    console.log(formData)
    return isValid;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validFormSubmission = await validateForm();
    if (validFormSubmission) {
      console.log('submitted')
    } else {
      console.log('invalid submission')
    }
  }
    
  
  const formButtonProps = {
    'text': 'Done!',
    onClick: handleSubmit
  }

  const homeButtonProps = {
    'text': 'Return to dashboard',
    href: '/dashboard'
  }


  return (
    <>
      ExerciseId: {exerciseId}
      <ExerciseDetails exerciseId={exerciseId} />
      {/* {exerciseDetailsComponent} */}
      <form onSubmit={handleSubmit}>
        <TrainingFormElements handleInputChange={handleInputChange} />
        <Button buttonProps={formButtonProps} />
      </form>
      <Button buttonProps={homeButtonProps} />
    </>
  )
}

export default TrainingPage
