import './CircleTag.scss';

const CircleTag = ({ text, className, title }) => {
  return (
    <div
      className={`circle-tag ${className}`}
      title={title}
    >
      <p className='tag-text'>{text}</p>
    </div>
  )
}

export default CircleTag
