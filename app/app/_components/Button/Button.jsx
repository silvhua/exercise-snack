'use client'
import './Button.scss';
import { useRouter } from 'next/navigation'

const Button = ({buttonProps}) => {
  const { text, className, routerPath } = buttonProps;
  const router = useRouter()

  const startTraining = () => {
    if (className === 'start-button' || !className) {
      // router.push('/training')
      router.push(routerPath);
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
