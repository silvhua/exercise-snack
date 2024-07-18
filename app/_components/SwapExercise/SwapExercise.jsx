import { useContext, useState } from "react";
import { DataContext } from "@/app/context-provider";

import './SwapExercise.scss';
import PillTag from "../PillTag/PillTag";
import CloseIcon from "../CloseIcon/CloseIcon";
import ActionIcon from "../ActionIcon/ActionIcon";
import CircleTag from "../CircleTag/CircleTag";

const SwapExercise = (props) => {
  const context = useContext(DataContext);
  const { movements, exercisesArray, discreetnessMapping } = context;
  const {
    isVisible, setIsVisible,
    currentMovementId, handleCollapseToggle,
    expanded, setExpanded, handleSelect,
    currentExerciseId, exerciseListRef
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
      alt = 'up arrow'
    }

    const actionIconProps = {
      src: src,
      alt: alt,
      onClick: handleToggle,
      className: "collapsible__arrow"
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
                      <CircleTag
                        className={`discreetness--${exercise.discreetness}`}
                        text={exercise.discreetness}
                        title={discreetnessMapping[exercise.discreetness]}
                      />
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
        <ActionIcon iconProps={actionIconProps} />
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

  function handleCloseModal() {
    exerciseListRef.current.close();
  }

  const closeIconProps = {
    onClick: handleCloseModal,
    className: 'close-icon'
  }

  return (
    <dialog
      ref={exerciseListRef}
      className="exercise-list"
    >
      <div className="modal-top">
        <h2 className="modal-heading">
          Swap Exercise
        </h2> 
        <CloseIcon closeIconProps={closeIconProps} />
      </div>
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

    </dialog>
  )
}

export default SwapExercise
