import './Checkbox.scss';

const Checkbox = ({ checkboxProps }) => {
  const { name, checked, onChange } = checkboxProps;

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
      >{name}</label>
    </li>
  )
}

export default Checkbox
