import './CloseIcon.scss';
import ActionIcon from '../ActionIcon/ActionIcon';

const CloseIcon = ({closeIconProps}) => {
  const { ref, toggleValue, setToggleValue} = closeIconProps;
  
  const actionIconProps = {
    src: './icons/close.svg',
    onClick: handleCloseIcon,
    className: 'close-icon'
  }

  function handleCloseIcon() {
    setToggleValue(!toggleValue);
  }
  
  return (
    <>
      <ActionIcon iconProps={actionIconProps} />
    </>
  )
}

export default CloseIcon
