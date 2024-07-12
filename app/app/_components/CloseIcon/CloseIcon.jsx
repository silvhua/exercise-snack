import './CloseIcon.scss';
import ActionIcon from '../ActionIcon/ActionIcon';

const CloseIcon = ({closeIconProps}) => {
  const { onClick } = closeIconProps;
  
  const actionIconProps = {
    src: './icons/close.svg',
    onClick: onClick,
    className: 'close-icon'
  }
  
  return (
    <>
      <ActionIcon iconProps={actionIconProps} />
    </>
  )
}

export default CloseIcon
