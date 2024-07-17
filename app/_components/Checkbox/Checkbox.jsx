
import './Checkbox.scss';

const Checkbox = (props) => {
  const { name, label, checked, onChange } = props;

  return (

    <li className='checkbox'>
      <label
        className='checkbox__label'
        htmlFor={name}
      >
        <input
          type='checkbox'
          id={name}
          name={name}
          className='checkbox__input'
          checked={checked}
          onChange={onChange}
        />
        <span className='checkbox__span'></span>
        
        {label}
      </label>
    </li>
  )
}

export default Checkbox
