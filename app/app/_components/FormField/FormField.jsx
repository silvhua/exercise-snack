import './FormField.scss';

const FormField = (props) => {
  const { formFieldProps } = props;
  const { type, name, placeholder, className, handleInputChange } = formFieldProps;
  return (
    <input
      type={type || 'text'}
      className={`${className}`}
      name={name}
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  )
}

export default FormField
