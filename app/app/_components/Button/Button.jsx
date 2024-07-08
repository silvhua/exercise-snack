'use client'
import './Button.scss';
// import { useRouter } from 'next/navigation'

const Button = ({buttonProps}) => {
  const { text, className, routerPath, onClick } = buttonProps;
  // const router = useRouter()

  // const startTraining = () => {
  //   if (className === 'start-button' || !className) {
  //     console.log(`${text} button clicked`);
  //     // router.push('/training')
  //     // router.push(routerPath);
  //   }
  // }
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
