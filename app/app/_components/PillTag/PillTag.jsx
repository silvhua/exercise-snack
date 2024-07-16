import './PillTag.scss';

const PillTag = (props) => {
  const {
    className, text, title
  } = props;
  return (
    <div
      className={className || 'pill'}
      title={title}
    >
      <p className='pill__text'>
        {text}
      </p>
    </div>
  )
}

export default PillTag
