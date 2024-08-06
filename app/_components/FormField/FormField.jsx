import FormErrorNotification from '../FormErrorNotification/FormErrorNotification';
import './FormField.scss';

const FormField = (props) => {
  const { formFieldProps } = props;
  const {
    type, name, placeholder, className, handleInputChange,
    inError, errorText
  } = formFieldProps;
  const finalClassName = inError ? `${className} error` : className;
  return (
    <div className='flex-column-div--no-gap'>
      <input
        type={type || 'text'}
        className={finalClassName}
        name={name}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <FormErrorNotification
        inError={inError}
        text={errorText}
      />
    </div>
  )
}

export default FormField
