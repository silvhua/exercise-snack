import './ItemCard.scss';

const ItemCard = ({data}) => {
  
  return (
    <div className='card'>
      {
        Object.entries(data).map(([key, value], index) => {
          return (
            <div className='card__property' key={index}>
              <h3 className='card__property-key'>{key}</h3>
              <p className='card__property-value'>{value}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default ItemCard
