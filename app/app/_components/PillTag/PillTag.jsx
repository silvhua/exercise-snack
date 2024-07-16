import './PillTag.scss';

const PillTag = (props) => {
  const {
    className, text
  } = props;
  return (
    <div className={className || 'pill'}>
      <p className='pill__text'>
        {text}
      </p>
    </div>
  )
}

export default PillTag
