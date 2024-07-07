'use client'
import './Button.scss';
import { useRouter } from 'next/navigation'

const Button = ({buttonProps}) => {
  const { text, className } = buttonProps;
  const router = useRouter()

  const startTraining = () => {
    if (className === 'start-button') {
      router.push('/training')
    }
  }
  return (
    <button
      className={className}
      onClick={startTraining}
    >
      {text}
    </button>
  )
}

export default Button
