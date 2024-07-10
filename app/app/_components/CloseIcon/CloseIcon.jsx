import './CloseIcon.scss';
import ActionIcon from '../ActionIcon/ActionIcon';

const CloseIcon = ({ dialogRef }) => {
  
  const closeIconProps = {
    src: './icons/close.svg',
    onClick: handleCloseIcon,
    className: 'close-icon'
  }

  function handleCloseIcon() {
    dialogRef.current.close();
  }
  
  return (
    <>
      <ActionIcon iconProps={closeIconProps} />
    </>
  )
}

export default CloseIcon
