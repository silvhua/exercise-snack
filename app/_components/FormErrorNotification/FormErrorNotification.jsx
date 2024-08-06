import './FormErrorNotification.scss';

const FormErrorNotification = ({inError, text}) => {
  let notificationText = text || "This field is required";
  notificationText = ` ${notificationText}`; // add a space between the preceding icon and the text
  return (
    <span className={inError ? "error__container" : "no-error"}>
      <p className={inError ? "error__text" : "no-error"}>{notificationText}</p>
    </span>
  );
}

export default FormErrorNotification;