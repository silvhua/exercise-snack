import './FormField.scss';

const FormField = (props) => {
  const { formFieldProps } = props;
  const { type, name, placeholder, className } = formFieldProps;
  
  return (
    <input
      type={type || 'text'}
      className={`${className}`}
      name={name}
      placeholder={placeholder}
    />
  )
}

export default FormField
