import './FilterMenuSection.scss';
import Checkbox from '../Checkbox/Checkbox';

const FilterMenuSection = (props) => {
  const {
    property, optionsArray,
    checkboxValues, setCheckboxValues
  } = props;

  const onChange = (event) => {
    const { name, checked } = event.target;
    checkboxValues[property][name] = checked;
    setCheckboxValues(checkboxValues)

    console.log(name, checked);
  }

  console.log(checkboxValues)

  return (
    <>
      <h3
        className='subtitle'
      >
        {property}
      </h3>
      <ul>
        {
          optionsArray.map((option, index) => {
            
            const optionId = option?.id;
            const checked = checkboxValues?.[property]?.[optionId] || false;
            const name = option?.name;
            return  (
              <Checkbox
                key={optionId}
                id={optionId}
                name={name}
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
