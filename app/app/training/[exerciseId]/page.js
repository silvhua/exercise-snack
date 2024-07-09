'use client'

// import './TrainingPage.scss';
import { useState, useEffect } from "react";
import Button from "@/app/_components/Button/Button";
import ExerciseDetails from "@/app/_components/ExerciseDetails/ExerciseDetails";
import apiInstance from "@/app/_libs/ApiClient";
import postData from "@/app/_libs/clientCrud";

const TrainingPage = ({ params }) => {
  const exerciseId = params.exerciseId;
  const storedUserInfo = JSON.parse(localStorage.getItem('userDetails'));
  const userId = storedUserInfo.id;
  const sessionObject = JSON.parse(sessionStorage.getItem('sessionDetails'));
  const sessionId = sessionObject.id;
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
  
  // const sessionObject = {
  //   userId: userId
  // }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
      reps: parseInt(formData.reps) < 0,
      duration: parseInt(formData.duration) < 0
    }
    setErrorState(errors);
    const propertiesWithErrors = Object.keys(errors).filter((key) => {
      return errors[key] == true;
    });
    const isValid = !Object.values(errors).includes(true);
    return isValid;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validFormSubmission = await validateForm();
    if (validFormSubmission) {
      console.log('submitted')
      const activityObject = { ...formData, exercise_id: exerciseId };
      activityObject.reps = parseInt(activityObject.reps) || null;
      activityObject.duration = parseInt(activityObject.duration) || null;
      console.log('activityObject', activityObject);
      const postActivityResponse = await postData(
        `sessions/${sessionId}/activities`, activityObject
      );
      console.log('post activity response\n', postActivityResponse);
    } else {
      console.log('invalid submission')
    }
  }
    
  // const homeButtonProps = {
  //   'text': 'Return to dashboard',
  //   href: '/dashboard'
  // }

  return (
    <>
      <ExerciseDetails
        exerciseId={exerciseId}
        onSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        
      />
      {/* <form onSubmit={handleSubmit}>
        <TrainingFormElements handleInputChange={handleInputChange} />
        <Button buttonProps={formButtonProps} />
      </form> */}
      {/* <Button buttonProps={homeButtonProps} /> */}
    </>
  )
}

export default TrainingPage
