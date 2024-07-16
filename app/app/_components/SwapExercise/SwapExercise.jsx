import { useContext, useState } from "react";
import { DataContext } from "@/app/context-provider";

import './SwapExercise.scss';
import PillTag from "../PillTag/PillTag";

const SwapExercise = (props) => {
  const context = useContext(DataContext);
  const { movements, exercisesArray } = context;
  const {
    isVisible, setIsVisible,
    currentMovementId, handleCollapseToggle,
    expanded, setExpanded, handleSelect,
    currentExerciseId
  } = props;

  function ExpandibleSection({ movement, makeVisible }) {

    const filteredExercises = exercisesArray.filter(exercise => {
      return exercise.movement_id === movement.id;
    })
    if (filteredExercises.length === 0) {
      return;
    }

    let titleClassName = 'collapsible__title';
    let pillTagClassName = 'hidden';
    if (movement.id === currentMovementId) {
      titleClassName = 'collapsible__title--current';
      pillTagClassName = 'pill';
    }
    
    let src = './icons/arrowDown.svg';
    let alt = 'down arrow';
    if (makeVisible) {
      src = './icons/arrowUp.svg';
      alt = 'up arrow';
    }

    const regionMapper = {
      'lower': 'lower body',
      'upper': 'upper body',
      'trunk': 'core/trunk'
    }

    return (
      <section
        id={`section_${movement.id}`}
        className='exercise-list__section'
      >
        <ul>
          <li className="collapsible" >
            <div
              onClick={handleCollapseToggle}
              className='collapsible__header'
              id={movement.id}
            >
              <div className="flex-row-div">
                <h3 className={titleClassName}>{movement.name}</h3>
                <PillTag
                  className='pill--blue'
                  text={movement.body_region} 
                  title={regionMapper[movement.body_region]}
                />
                <PillTag
                  className={pillTagClassName}
                  text='current'
                />

              </div>
            </div>
            <div className={makeVisible ? 'collapsible__body' : 'hidden'}>
              {
                filteredExercises.map(exercise => {
                  const pillTagClassName = exercise.id === currentExerciseId
                    ? 'pill' : 'hidden';
                  return (
                    <div 
                      key={exercise.id}
                      className="collapsible__list-item"
                      onClick={handleSelect}
                    >
                      <p
                        id={exercise.id}
                        className="collapsible__exercise"
                      >{exercise.name}</p>
                      <PillTag
                        className={pillTagClassName}
                        text='current'
                      />
                    </div>
                  )
                })
              }
            </div>
            
          </li>
        </ul>
        <img 
          src={src}
          alt={alt}
          onClick={handleToggle}
          className="collapsible__arrow"
        />
      </section>
    )
  }

  function handleToggle(event) {
    const clickedId = event.target.parentNode.id.split('_')[1];
    setExpanded({
      ...expanded
      , [clickedId]: !expanded[clickedId]
    });
    setIsVisible({
      ...isVisible, [clickedId]: !expanded[clickedId]
    });

  }

  return (
    <div className="exercise-list"> 
      {
      movements.map(movement => {
        const makeVisible = isVisible[movement.id] || expanded[movement.id]
        return (
          <ExpandibleSection
            key={movement.id}
            movement={movement}
            makeVisible={makeVisible}
          />
        )
        })
      }

    </div>
  )
}

export default SwapExercise
