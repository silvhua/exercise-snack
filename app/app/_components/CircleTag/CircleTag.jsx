import './CircleTag.scss';

const CircleTag = ({ text, imgSrc, className }) => {
  return (
    <div className={`circle-tag ${className}`}>
      <p className='tag-text'>{text}</p>
    </div>
  )
}

export default CircleTag
