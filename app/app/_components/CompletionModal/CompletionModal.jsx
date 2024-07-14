import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import Streak from "../Streak/Streak";
import { isSameDate } from "@/app/_libs/dataProcessing";

import './CompletionModal.scss';
const CompletionModal = ({ modalProps }) => {
  const router = useRouter();
  const { context, completeRef } = modalProps;
  const {
    streakValue,
    recentSessions
  } = context;

  const newSessionObject = {
    /* 
    This dummy session object is added to the `recentSessions` array because
    this modal needs to show that a session was logged today but shouldn't 
    have to wait for a new API call or re-render of the training page 
    */
    id: 'dummySessionToAvoidNeedForStateUpdate',
    date: new Date()
  }
  let lastActivityDate = JSON.parse(
    sessionStorage.getItem('lastActivityDate')
  ) || {};
  lastActivityDate = new Date(lastActivityDate?.date) || new Date();
  let newStreakValue = { ...streakValue };
  let newRecentSessions = [...recentSessions];
  if (!isSameDate(lastActivityDate, new Date())) {
    newStreakValue.consecutive_days += 1;
    newRecentSessions.push(newSessionObject);
    console.log('+1 to streak for modal only');
  }

  /* 
  The dashboard will show these updated values because of the 
  nature of how objects and arrays can be updated w/o having to redeclare
  them (computer science stuff to do with pointers)
  */

  const completeButtonProps = {
    text: 'Done!',
    classname: '',
    onClick: handleCompleteClick
  }

  function handleCompleteClick() {
    console.log('Workout complete...back to dashboard')
    router.push('/dashboard');
  }

  return (
    <dialog
      ref={completeRef}
      className='responsive-modal'
    >
      <section className="complete">
        <div className="complete__div">
          <img 
            src='./images/running.svg'
            className="complete-cartoon"
          />
          <h3 className="streak__text">
            <span className="streak__number">
              {newStreakValue.consecutive_days}
            </span> day streak 
          </h3>
          <Streak
            data={newRecentSessions}
            interval={7}
          />

        </div>
        <Button buttonProps={completeButtonProps} />
      </section>
    </dialog>
  )
}

export default CompletionModal
