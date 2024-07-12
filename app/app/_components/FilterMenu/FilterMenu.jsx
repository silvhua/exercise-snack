"use client"

import { useEffect, useState } from 'react';
import './FilterMenu.scss';
import CloseIcon from '../CloseIcon/CloseIcon';
import Checkbox from '../Checkbox/Checkbox';
import { readProperty } from './properties';
import Placeholder from '../Placeholder/Placeholder';
import FilterMenuSection from '../FilterMenuSection/FilterMenuSection';
import Button from '../Button/Button';

const FilterMenu = ({ filterProps }) => {
  /* 
  This content of this menu is dynamic: It is based on data from the database.
  There are a few exercise properties that can be used for filtering exercises.
  Each of these properties has a few possible options. 
  More than 1 option can be selected.
  */
  const { filterRef, onSubmit, checkboxValues, setCheckboxValues } = filterProps;

  const [filterOptions, setFilterOptions] = useState({
    'context': null, 
    // 'environment': null,
    // 'discreetness': null,
    // 'focus': null
  });

  const [isLoading, setIsLoading] = useState(true);
  const [formContent, setFormContent] = useState('placeholder')
  const properties = [ // Properties for filtering exercises
    'context',
    // 'environment', 
    // 'focus',
    // 'discreetness',
  ]

  async function getProperties() {
    const filterOptionsResults = {};
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      const result = await readProperty(property);
      filterOptionsResults[property] = result;
    }
    setFilterOptions(filterOptionsResults);
    setIsLoading(false);
  }

  useEffect(() => {
    getProperties();

  }, [isLoading])

  useEffect(() => {
    if (!isLoading) {
      const sections = properties.map(property => {
        const optionsArray = filterOptions[property];
        return (
          <FilterMenuSection
            key={`${property}-section`}
            property={property}
            optionsArray={optionsArray}
            checkboxValues={checkboxValues}
            setCheckboxValues={setCheckboxValues}
          />
        )
      })
      setFormContent(
        <form
          className='filter-form'
          id='filter-form'
        >
          <Button buttonProps={saveButtonProps} />
          {sections}
        </form>
      )
    }
  }, [filterOptions, checkboxValues]);

  const closeIconProps = {
    ref: filterRef
  }

  const saveButtonProps = {
    text: 'Save',
    onClick: onSubmit,
    className: 'filter-menu__button'
  }

  return (
    <dialog
      ref={filterRef}
      className="filter-menu"
    >
      <h2 className='headline4'>Filters</h2>
      <CloseIcon closeIconProps={closeIconProps} />
      {formContent}
      
    </dialog>
  )
}

export default FilterMenu
