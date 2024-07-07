import CircleTag from '../CircleTag/CircleTag';
import FormField from '../FormField/FormField';

import './TrainingFormElements.scss';


const TrainingFormElements = async () => {

  const repsInputProps = {
    type: 'number',
    name: 'reps',
    placeholder: 'reps',
    className: 'input--small'
  }

  const durationInputProps = {
    type: 'number',
    name: 'duration',
    placeholder: 'seconds',
    className: 'input--small'
  }


  const commentsInputProps = {
    type: 'text',
    name: 'notes',
    placeholder: 'Comments',
    className: 'input--wide'
  }

  return (
    <div className='form__input-group'>
      <CircleTag
        text="1"
      />
      <div className="form__fields-container">
        <div className='form__number-input-div'>
          <FormField formFieldProps={repsInputProps} />
          <FormField formFieldProps={durationInputProps} />
        </div>
        <FormField formFieldProps={commentsInputProps} />
      </div>
    </div>
  )
}

export default TrainingFormElements
