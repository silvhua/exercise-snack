import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import Streak from "../Streak/Streak";
import { isSameDate, updateStatsWithoutStateChange } from "@/app/_libs/dataProcessing";

import './CompletionModal.scss';
const CompletionModal = ({ modalProps }) => {
  const router = useRouter();
  const { context, previousActivityCount, completeRef } = modalProps;
  const {
    streakValue,
    recentSessions
  } = context;

  console.log('previousActivityCount in modal', previousActivityCount, typeof previousActivityCount)

  const newSessionObject = {
    /* 
    This dummy session object is added to the `recentSessions` array because
    this modal needs to show that a session was logged today but shouldn't 
    have to wait for a new API call or re-render of the training page 
    */
    id: 'dummySessionToAvoidNeedForStateUpdate',
    date: new Date()
  }
  // const modalStreakValue = { ...streakValue }; // make a copy because we don't want to update the actual context object unless form is submitted
  // sessionStorage.setItem(
  //   'modalLastActivityDate', JSON.stringify(
  //     {date: new Date()}
  //   )
  // )
  // const updateStreak = updateStatsWithoutStateChange(
  //   recentSessions, modalStreakValue, newSessionObject,
  //   'modalLastActivityDate'
  // );

  // console.log('modalStreakValue.consecutive_days before', modalStreakValue.consecutive_days)

  // modalStreakValue.consecutive_days = updateStreak ?
  //   modalStreakValue.consecutive_days + 1 : modalStreakValue.consecutive_days;
  

  // console.log(updateStreak, modalStreakValue.consecutive_days)

  let modalRecentSessions = recentSessions;
  let modalStreakValue = streakValue.consecutive_days;
  if (previousActivityCount === 0) {
    
    modalRecentSessions = [...recentSessions, newSessionObject];
    modalStreakValue = streakValue.consecutive_days + 1;
    console.log('updating modal previousActivityCount', modalStreakValue)
  }
  // const newRecentSessions = updateStreak ? 
  //   [...recentSessions, newSessionObject] :
  //   recentSessions

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
              {modalStreakValue}
            </span> day streak 
          </h3>
          {
            modalStreakValue > 0 ?
            <Streak
              data={modalRecentSessions}
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
