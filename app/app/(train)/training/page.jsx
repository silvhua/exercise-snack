'use client'

import { useState } from "react";
import ExerciseDetails from "@/app/_components/ExerciseDetails/ExerciseDetails";
import postData, { updateProgram } from "@/app/_libs/clientCrud";
import { useRouter } from "next/navigation";
import { checkForSuccess } from "@/app/_libs/ApiClient";

const TrainingPage = () => {
  const router = useRouter();
  const storedUserInfo = JSON.parse(localStorage.getItem('userDetails'));
  
  const storedArray = JSON.parse(sessionStorage.getItem('userProgram'));
  const exerciseId = storedArray[0].id;

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
      const postActivityResponse = await postData(
        `sessions/${sessionId}/activities`, activityObject
      );

      if (checkForSuccess(postActivityResponse)) {
        /* 
        Exercises were previously rotated in the `UpcomingExercises` component
        so they should be saved
        */
        const updateProgramResponse = await updateProgram(userId, storedArray);
        if (checkForSuccess(updateProgramResponse)) {
          console.log('Program successfully edited');
        }
      }

      // save latest ExerciseId to localStorage so dashboard can rotate the exercise array
      const latestExerciseId = exerciseId;
      localStorage.setItem(
        'latestExerciseId', latestExerciseId
      );

      router.push('/dashboard');
    } else {
      alert('Numbers must be non-negative.')
    }
  }

  return (
    <section>
      <ExerciseDetails
        exerciseId={exerciseId}
        onSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        
      />
    </section>
  )
}

export default TrainingPage
