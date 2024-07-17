import CircleTag from '../CircleTag/CircleTag';
import './ExerciseCard.scss';

const ExerciseCard = ({ exerciseObject, discreetnessText }) => {
  const {
    id, name, movement, discreetness, 
  } = exerciseObject;
  /* 
  Plan for card info:
  - movement category: text - done
  - discreetness: 1 number - done
  - condition: 1+ icons - to do
  - focus: 1+ icons - to-do
  - environment: 1+ icons - to-do
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
 