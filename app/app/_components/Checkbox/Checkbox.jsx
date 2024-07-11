import './Checkbox.scss';

const Checkbox = ({ checkboxProps }) => {
  const { name, checked } = checkboxProps;
  return (
    <li className='checkbox'>
      <input
        type='checkbox'
        id={name}
        name={name}
        className='checkbox__input'
        checked={checked}
      />
      <label
        className='checkbox__label'
        for={name}
      >{name}</label>
    </li>
  )
}

export default Checkbox
