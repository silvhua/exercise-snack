
import './Checkbox.scss';

const Checkbox = (props) => {
  const { name, label, checked, onChange } = props;

  return (

    <li className='checkbox'>
      <input
        type='checkbox'
        id={name}
        name={name}
        className='checkbox__input'
        checked={checked}
        onChange={onChange}
      />
      <label
        className='checkbox__label'
        htmlFor={name}
      >{label}</label>
    </li>
  )
}

export default Checkbox
