import { useContext, useState } from "react";
import { DataContext } from "@/app/context-provider";

import './SwapExercise.scss';
import CircleTag from "../CircleTag/CircleTag";

const SwapExercise = (props) => {
  const context = useContext(DataContext);
  const { movements, exercisesArray } = context;
  const {
    isVisible, setIsVisible,
    currentMovementId, handleCollapseToggle,
    expanded, setExpanded, handleSelect
  } = props;


  const circleTagMapper = {
    'lower': ['L', 'lower body'],
    'upper': ['U', 'upper body'],
    'trunk': ['C', 'core/trunk']
  }
  function ExpandibleSection({ movement, makeVisible }) {

    const filteredExercises = exercisesArray.filter(exercise => {
      return exercise.movement_id === movement.id;
    })
    if (filteredExercises.length === 0) {
      return;
    }

    const headerClassName = movement.id === currentMovementId ?
      'collapsible__header--current' : 'collapsible__header'
    
    let src = './icons/arrowDown.svg';
    let alt = 'down arrow';
    if (makeVisible) {
      src = './icons/arrowUp.svg';
      alt = 'up arrow';
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
              className={headerClassName}
              id={movement.id}
            >
              <div className="flex-row-div">
                <h3 className="collapsible__title">{movement.name}</h3>
                <CircleTag
                  text={circleTagMapper[movement.body_region]?.[0] || '∫'}
                  title={circleTagMapper[movement.body_region]?.[1] || 'various body regions'}
                  className='body-region-tag'
                />

              </div>
            </div>
            <div className={makeVisible ? 'collapsible__body' : 'hidden'}>
              {
                filteredExercises.map(exercise => {
                  return (
                    <p
                      key={exercise.id}
                      id={exercise.id}
                      className="collapsible__list-item"
                      onClick={handleSelect}
                    >{exercise.name}</p>
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
