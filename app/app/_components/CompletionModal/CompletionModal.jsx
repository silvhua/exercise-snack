import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import Streak from "../Streak/Streak";

import './CompletionModal.scss';
import { isSameDate } from "@/app/_libs/dataProcessing";

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
  recentSessions.push(newSessionObject);
  const updatedStreak = streakValue.consecutive_days + 1;

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
        <h3 className="streak__text">
          <span className="streak__number">
            {updatedStreak}
          </span> days streak 
        </h3>
        <Streak
          data={recentSessions}
          interval={7}
        />
        <Button buttonProps={completeButtonProps} />
      </section>
    </dialog>
  )
}

export default CompletionModal
