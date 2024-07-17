import './FilterIcon.scss';
import ActionIcon from '../ActionIcon/ActionIcon';

const FilterIcon = ({handleClick}) => {

  const filterIconProps = {
    src: './icons/filter.svg',
    className: 'filter-icon',
    onClick: handleClick,
    alt: 'filter icon'
  }

  return (
    <>
      <ActionIcon iconProps={filterIconProps} />
    </>
  )
}

export default FilterIcon
