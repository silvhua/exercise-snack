import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import Streak from "../Streak/Streak";
import { isSameDate, updateStatsWithoutStateChange } from "@/app/_libs/dataProcessing";

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

  const newRecentSessions = updateStatsWithoutStateChange(recentSessions, newSessionObject);

  // const today = new Date();
  // let sessionLastActivityDate = JSON.parse(
  //   sessionStorage.getItem('lastActivityDate')
  // );
  // let firstActivity;
  // if (sessionLastActivityDate?.date) {
  //   firstActivity = false;
  // } else {
  //   firstActivity = true;
  // }
  
  // const contextLastActivityDate = new Date(recentSessions[0].date) 
  // // let newStreakValue = { ...streakValue };
  // const newRecentSessions = [...recentSessions];
  // if (
  //   firstActivity
  //   && !isSameDate(contextLastActivityDate, today)
  // ) {
  //   streakValue.consecutive_days += 1;
  //   console.log('+1 in completion modal')
  //   // newStreakValue.consecutive_days += 1;
  //   newRecentSessions.push(newSessionObject);
  // } 

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
              {streakValue.consecutive_days}
            </span> day streak 
          </h3>
          {
            streakValue.consecutive_days > 0 ?
            <Streak
              data={newRecentSessions}
              interval={7}
              />
              : null              
          }
        </div>
        <Button buttonProps={completeButtonProps} />
      </section>
    </dialog>
  )
}

export default CompletionModal
