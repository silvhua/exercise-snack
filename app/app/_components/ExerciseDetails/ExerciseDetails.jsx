import './ExerciseDetails.scss';

const ExerciseDetails = ({ exerciseObject }) => {
  const { id, name, video, ...detailsObject } = exerciseObject;
  return (
    <article key='details' className='exercise'>
      
      <h1>{name}</h1>
      {
        Object.entries(detailsObject).map(([key, value]) => {
          if (value && typeof value === 'object') {
            const valuesArray = Object.values(value);
            
            return (
              <div key={key} className='exercise__property'>
                <h3>{key}</h3>
                <p>{valuesArray.map((element) => element[key]).join(', ')}</p>
              </div>
            )
          } else {
            return (
              <div key={key} className='exercise__property'>
                <h3>{key}</h3>
                <p>{value}</p>
              </div>
            )
          }
        })
      }
    </article>
  )
}

export default ExerciseDetails
