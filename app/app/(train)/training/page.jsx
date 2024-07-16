'use client'

import { useState, useRef, useContext } from "react";
import { DataContext } from "@/app/context-provider";
import ExerciseDetails from "@/app/_components/ExerciseDetails/ExerciseDetails";
import postData, { updateProgram } from "@/app/_libs/clientCrud";
import { useRouter } from "next/navigation";
import { checkForSuccess } from "@/app/_libs/ApiClient";
import CompletionModal from "@/app/_components/CompletionModal/CompletionModal";
import { getPastWeekActivty } from "@/app/_libs/dataProcessing";
import SwapExercise from "@/app/_components/SwapExercise/SwapExercise";

const TrainingPage = () => {
  const context = useContext(DataContext);
  const {
    activityArray, movements,
    programArray, setProgramArray
  } = context;
  const completeRef = useRef();
  const router = useRouter();
  
  const storedArray = JSON.parse(sessionStorage.getItem('userProgram'));
  const firstExercise = storedArray[0];
  // const exerciseId = firstExercise.id;
  // const currentMovementId = firstExercise.movement_id;
  const {
    id: exerciseId,
    movement_id: currentMovementId
  } = firstExercise;


  const isVisibleObject = {};
  movements.forEach(movement => {
    isVisibleObject[movement.id] = movement.id === currentMovementId ? true : false;
  })

  const [isVisible, setIsVisible] = useState(isVisibleObject);
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
  
  if (!activityArray || activityArray?.length === 0) {
    router.push('/dashboard');
    return;
  }

  
  const previousActivityCount = parseInt(
    sessionStorage.getItem('sessionActivityCount')
  );
   
  const recentSessions = getPastWeekActivty(activityArray);

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

      const activityObject = { ...formData, exercise_id: exerciseId, id: 'tempId' };
      const updatedActivityCount = previousActivityCount + 1
      sessionStorage.setItem('sessionActivityCount', updatedActivityCount);
      if (previousActivityCount === 0) {
        const activityObjectForUpdateBeforeStateChange = { ...activityObject, date: new Date()}
        context.recentSessions.unshift(activityObjectForUpdateBeforeStateChange);
        context.activityArray.unshift({
          ...activityObjectForUpdateBeforeStateChange,
          n_sets: updatedActivityCount
        });
        context.streakValue.consecutive_days += 1;
      }

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
        }
      }

      // save latest ExerciseId to localStorage so dashboard can rotate the exercise array
      const latestExerciseId = exerciseId;
      localStorage.setItem(
        'latestExerciseId', latestExerciseId
      );

      completeRef.current.showModal();
    } else {
      alert('Numbers must be non-negative.')
    }
  }

  const modalProps = {
    context: context,
    previousActivityCount: previousActivityCount,
    completeRef: completeRef,
  }

  return (
    <section>
      <ExerciseDetails
        exerciseId={exerciseId}
        onSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
      {
        recentSessions ? 
          <CompletionModal modalProps={modalProps} /> :
          null
      }
      <SwapExercise
        isVisible={isVisible}
        currentMovementId={currentMovementId}
      />
    </section>
  )
}

export default TrainingPage
