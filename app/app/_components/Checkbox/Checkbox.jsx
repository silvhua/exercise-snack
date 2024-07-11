import { convertToKebabCase } from '@/app/_libs/dataProcessing';
import './Checkbox.scss';

const Checkbox = (props) => {
  const { id, name, checked, onChange } = props;
  const inputName = convertToKebabCase(name);

  return (

    <li className='checkbox'>
      <input
        type='checkbox'
        id={id}
        name={inputName}
        className='checkbox__input'
        checked={checked}
        onChange={onChange}
      />
      <label
        className='checkbox__label'
        htmlFor={inputName}
      >{name}</label>
    </li>
  )
}

export default Checkbox
