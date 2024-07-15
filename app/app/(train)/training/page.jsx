'use client'

import { useState, useRef, useContext } from "react";
import { DataContext } from "@/app/context-provider";
import ExerciseDetails from "@/app/_components/ExerciseDetails/ExerciseDetails";
import postData, { updateProgram } from "@/app/_libs/clientCrud";
import { useRouter } from "next/navigation";
import { checkForSuccess } from "@/app/_libs/ApiClient";
import CompletionModal from "@/app/_components/CompletionModal/CompletionModal";
import { getPastWeekActivty, isSameDate, updateStatsWithoutStateChange } from "@/app/_libs/dataProcessing";

const TrainingPage = () => {
  const context = useContext(DataContext);
  const { activityArray } = context;
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

      const activityObject = { ...formData, exercise_id: exerciseId };
      if (previousActivityCount === 0) {
        sessionStorage.setItem('sessionActivityCount', previousActivityCount + 1);

        


        // console.log('setting activity count to ', previousActivityCount + 1)
        // context.streakValue.consecutive_days += 1;
        // console.log('+1 in training page')
        // context.recentSessions.push(activityObject);
      }

      // const updateStreak = updateStatsWithoutStateChange(
      //   recentSessions, context.streakValue, activityObject,
      //   'lastActivityDate'
      // );
      // if (updateStreak) {
      //   sessionStorage.setItem(
      //     'lastActivityDate', JSON.stringify(
      //       {date: new Date()}
      //     )
      //   )

      // }
      // context.recentSessions.push({...activityObject, date: new Date()});


      // let lastActivityDate = JSON.parse(
      //   sessionStorage.getItem('lastActivityDate')
      // ) || {};
      // lastActivityDate = new Date(lastActivityDate?.date) || new Date();

      // if (!isSameDate(lastActivityDate, new Date())) {
      //   context.streakValue.consecutive_days = context.streakValue.consecutive_days + 1;
      //   sessionStorage.setItem(
      //     'lastActivityDate', JSON.stringify(
      //       {date: new Date()}
      //     )
      //   )
      // }

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
    </section>
  )
}

export default TrainingPage
