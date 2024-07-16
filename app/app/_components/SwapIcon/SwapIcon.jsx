import ActionIcon from '../ActionIcon/ActionIcon';
import './SwapIcon.scss';


const SwapIcon = ({ onClick }) => {
  
  const swapIconProps = {
    src: './icons/swap.svg',
    onClick: onClick,
    className: 'swap-icon'
  }

  return (
    <>
      <ActionIcon iconProps={swapIconProps} />
    </>
  )
}

export default SwapIcon
