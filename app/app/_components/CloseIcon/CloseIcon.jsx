import './CloseIcon.scss';
import ActionIcon from '../ActionIcon/ActionIcon';

const CloseIcon = ({closeIconProps}) => {
  const { ref } = closeIconProps;
  
  const actionIconProps = {
    src: './icons/close.svg',
    onClick: handleCloseIcon,
    className: 'close-icon'
  }

  function handleCloseIcon() {
    ref.current.close();
  }
  
  return (
    <>
      <ActionIcon iconProps={actionIconProps} />
    </>
  )
}

export default CloseIcon
