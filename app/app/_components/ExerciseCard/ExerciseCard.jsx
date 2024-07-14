import CircleTag from '../CircleTag/CircleTag';
import './ExerciseCard.scss';

const ExerciseCard = ({ exerciseObject, discreetnessText }) => {
  const {
    id, name, movement, discreetness, 
  } = exerciseObject;
  /* 
  - movement category: text
  - discreetness: 1 number
  - condition: 1+ icons
  - focus: 1+ icons
  - environment: 1+ icons

  */
  
  return (
    <li className='exercise-card'>
      <div className='exercise-card__top'>
        <h3 className='subtitle'>{movement}</h3>
          <div className='exercise-tag-div'>
            <CircleTag 
              className='exercise-tag'
              text={discreetness}
              title={discreetnessText}
            />
          </div>

        </div>
      <p className='exercise-card__bottom-text'>{name}</p>
    </li>
  )
}

export default ExerciseCard
 