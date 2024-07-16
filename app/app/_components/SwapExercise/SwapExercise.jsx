import { useContext } from "react";
import { DataContext } from "@/app/context-provider";

import './SwapExercise.scss';
import CircleTag from "../CircleTag/CircleTag";

const SwapExercise = (props) => {
  const context = useContext(DataContext);
  const { movements, exercisesArray } = context;
  const { isVisible, currentMovementId, handleCollapseToggle } = props;


  const circleTagMapper = {
    'lower': ['L', 'lower body'],
    'upper': ['U', 'upper body'],
    'trunk': ['C', 'core/trunk']
  }
  function ExpandibleSection ({ movement, makeVisible }) {

    const filteredExercises = exercisesArray.filter(exercise => {
      return exercise.movement_id === movement.id;
    })
    if (filteredExercises.length === 0) {
      return;
    }

    const headerClassName = movement.id === currentMovementId ?
      'collapsible__header--current' : 'collabsible__header'

    return (
      <ul
        onClick={handleCollapseToggle}
        className='exercise-list__section'
        id={movement.id}
      >
        <li className="collapsible" >
          <div className={headerClassName}>
            <h3>{movement.name}</h3>
            <CircleTag
              text={circleTagMapper[movement.body_region]?.[0] || '∫'}
              title={circleTagMapper[movement.body_region]?.[1] || 'various body regions'}
              className='body-region-tag'
            />
          </div>
          <div className={makeVisible ? 'collabsiple__body' : 'hidden'}>
            {
              filteredExercises.map(exercise => {
                return <p key={exercise.id}>{exercise.name}</p>
              })
            }
          </div>
          
        </li>
      </ul>
    )
  }

  return (
    <section> 
      {
      movements.map(movement => {
        const makeVisible = isVisible[movement.id];
        return (
          <ExpandibleSection
            key={movement.id}
            movement={movement}
            makeVisible={makeVisible}
          />
        )
        })
      }

    </section>
  )
}

export default SwapExercise
