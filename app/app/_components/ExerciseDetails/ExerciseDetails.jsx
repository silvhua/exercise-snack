import './ExerciseDetails.scss';

const ExerciseDetails = ({ exerciseObject }) => {
  const { id, name, video, ...detailsObject } = exerciseObject;
  return (
    <article className='exercise'>
      
      <h1>{name}</h1>
      {
        Object.entries(detailsObject).map(([key, value]) => {
          return (
            <div className='exercise'>
              <h3>{key}</h3>
              <p>{value}</p>
            </div>
          )
        })
      }
    </article>
  )
}

export default ExerciseDetails
