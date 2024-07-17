import './FilterMenuSection.scss';
import Checkbox from '../Checkbox/Checkbox';
import { convertToKebabCase } from '@/app/_libs/dataProcessing';

const FilterMenuSection = (props) => {
  const {
    property, optionsArray,
    checkboxValues, setCheckboxValues
  } = props;

  const onChange = (event) => {
    const { name, checked } = event.target;
    const propertyCheckboxValues = checkboxValues[property];
    propertyCheckboxValues[name] = checked;
    setCheckboxValues({ ...checkboxValues, [property]: propertyCheckboxValues });
  }


  return (
    <>
      <h3
        className='filter-menu__subtitle'
      >
        {property}
      </h3>
      <ul>
        {
          optionsArray.map((option) => {
            
            const optionId = option?.id;
            const name = option?.name;
            const inputName = convertToKebabCase(name);
            const checked = checkboxValues?.[property]?.[inputName] || false;
            
            return  (
              <Checkbox
                key={optionId}
                name={inputName}
                label={name}
                onChange={onChange}
                checked={checked}
              />
              )
            }
          )
        }
      </ul>
    </>
  )
}

export default FilterMenuSection
