import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import Streak from "../Streak/Streak";

import './CompletionModal.scss';

const CompletionModal = ({ modalProps }) => {
  const router = useRouter();
  const { context, completeRef } = modalProps;
  const {
    streakValue, 
    recentSessions
  } = context;

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
            {streakValue.consecutive_days}
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
