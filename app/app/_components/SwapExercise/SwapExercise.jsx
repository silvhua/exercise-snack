import { useContext } from "react";
import { DataContext } from "@/app/context-provider";

import './SwapExercise.scss';

const SwapExercise = (props) => {
  const context = useContext(DataContext);
  const { movements, exercisesArray } = context;
  const { isVisible, currentMovementId, handleCollapseToggle } = props;


  function ExpandibleSection ({ movement, makeVisible }) {

    const filteredExercises = exercisesArray.filter(exercise => {
      return exercise.movement_id === currentMovementId;
    })

    return (
      <ul
        onClick={handleCollapseToggle}
        className="exercise-list__section"
        id={movement.id}
      >
        <li className="collapsible" >
          <div className="collapsible__header">
            <h3>{movement.name}</h3>
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
