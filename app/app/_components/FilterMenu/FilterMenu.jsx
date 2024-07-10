
import './FilterMenu.scss';
import CloseIcon from '../CloseIcon/CloseIcon';

const FilterMenu = ({filterProps}) => {
  const { filterRef } = filterProps;
  return (
    <dialog  ref={filterRef} className="filter-menu">
      <h2 className='headline4'>Filters</h2>
      <CloseIcon dialogRef={filterRef} />
      <form>
      </form>
      
    </dialog>
  )
}

export default FilterMenu
