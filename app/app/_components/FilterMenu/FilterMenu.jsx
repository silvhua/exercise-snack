"use client"

import { useEffect, useState } from 'react';
import './FilterMenu.scss';
import CloseIcon from '../CloseIcon/CloseIcon';
import Checkbox from '../Checkbox/Checkbox';
import { readProperty } from './properties';

const FilterMenu = ({filterProps}) => {
  const { filterRef, filterShown, setFilterShown } = filterProps;
  const [filterOptions, setFilterOptions] = useState(null);
  const properties = [ // Properties for filtering exercises
    'context',
    'environment', 
    'discreetness',
    'focus'
  ]

  async function getProperty(property) {
    const result = await readProperty(property);
    console.log(result)
    return result;
  }

  useEffect(() => {
    const filterOptionsResults = {}
    properties.forEach(property => {
      filterOptionsResults[property] = getProperty(property);
    })
  })

  const closeIconProps = {
    ref: filterRef,
    toggleValue: filterShown,
    setToggleValue: setFilterShown
  }

  const checkboxProps = {
    name: "Watching video",
    checked: false,
    onChange: (event) => {console.log(event.target)}
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
          <ul>
            <Checkbox checkboxProps={checkboxProps} />
          </ul>
            
          <h3 className='subtitle'>Focus</h3>
        </form>
        
      </div>
    </>
  )
}

export default FilterMenu
