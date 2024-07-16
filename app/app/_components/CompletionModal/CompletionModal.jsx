import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import Streak from "../Streak/Streak";

import './CompletionModal.scss';
const CompletionModal = ({ modalProps }) => {
  const router = useRouter();
  const { context, previousActivityCount, completeRef } = modalProps;
  const {
    streakValue,
    activityArray,
  } = context;

  const newSessionObject = {
    /* 
    This dummy session object is added to the `modalActivityArray` array because
    this modal needs to show that a session was logged today but shouldn't 
    have to wait for a new API call or re-render of the training page 
    */
    id: 'dummySessionToAvoidNeedForStateUpdate',
    date: new Date()
  }

  let modalActivityArray = activityArray;
  let modalStreakValue = streakValue.consecutive_days;
  if (previousActivityCount === 0) {
    modalActivityArray = [...activityArray, newSessionObject];
    modalStreakValue = streakValue.consecutive_days + 1;
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
              data={modalActivityArray}
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
