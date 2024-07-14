'use client'

import { useState, useRef, useContext } from "react";
import { DataContext } from "@/app/context-provider";
import ExerciseDetails from "@/app/_components/ExerciseDetails/ExerciseDetails";
import postData, { updateProgram } from "@/app/_libs/clientCrud";
import { useRouter } from "next/navigation";
import { checkForSuccess } from "@/app/_libs/ApiClient";
import CompletionModal from "@/app/_components/CompletionModal/CompletionModal";
import { isSameDate } from "@/app/_libs/dataProcessing";

const TrainingPage = () => {
  const context = useContext(DataContext);
  const { recentSessions } = context;
  const completeRef = useRef();
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

      const activityObject = { ...formData, exercise_id: exerciseId };
      context.recentSessions.push({...activityObject, date: new Date()});
      console.log(context.recentSessions)
      console.log(activityObject)

      let lastActivityDate = JSON.parse(
        sessionStorage.getItem('lastActivityDate')
      ) || {};
      lastActivityDate = new Date(lastActivityDate?.date) || new Date();
      if (!isSameDate(lastActivityDate, new Date())) {
        context.streakValue.consecutive_days = context.streakValue.consecutive_days + 1;
        sessionStorage.setItem(
          'lastActivityDate', JSON.stringify(
            {date: new Date()}
          )
        )
      }

      /* **************************************
      2024-07-13 21:35: uncomment the section below to resume updating 
      activity table
      ***************************************
      */
    //   activityObject.reps = parseInt(activityObject.reps) || null;
    //   activityObject.duration = parseInt(activityObject.duration) || null;
    //   const postActivityResponse = await postData(
    //     `sessions/${sessionId}/activities`, activityObject
    //   );

    //   if (checkForSuccess(postActivityResponse)) {
    //     /* 
    //     Exercises were previously rotated in the `UpcomingExercises` component
    //     so they should be saved
    //     */
    //     const updateProgramResponse = await updateProgram(userId, storedArray);
    //     if (checkForSuccess(updateProgramResponse)) {
    //       console.log('Program successfully edited');
    //     }
    //   }

    //   // save latest ExerciseId to localStorage so dashboard can rotate the exercise array
    //   const latestExerciseId = exerciseId;
    //   localStorage.setItem(
    //     'latestExerciseId', latestExerciseId
    //   );


      completeRef.current.showModal();
    } else {
      alert('Numbers must be non-negative.')
    }
  }

  const modalProps = {
    router: router,
    context: context,
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
    </section>
  )
}

export default TrainingPage
