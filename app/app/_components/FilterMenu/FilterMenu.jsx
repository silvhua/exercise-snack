
import './FilterMenu.scss';
import CloseIcon from '../CloseIcon/CloseIcon';

const FilterMenu = ({filterProps}) => {
  const { filterRef, filterShown, setFilterShown } = filterProps;
  const closeIconProps = {
    ref: filterRef,
    toggleValue: filterShown,
    setToggleValue: setFilterShown
  }
  return (
    <>
    <section className='backdrop'>
    </section>
    <div
      ref={filterRef}
      className="filter-menu"
    >
      <h2 className='headline4'>Filters</h2>
      <CloseIcon closeIconProps={closeIconProps} />
      <form className='filter-form'>
        <h3 className='subtitle'>Condition</h3>
        <h3 className='subtitle'>Focus</h3>
      </form>
      
    </div>
    </>
  )
}

export default FilterMenu
