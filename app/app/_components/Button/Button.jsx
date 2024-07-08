'use client'
import Link from 'next/link';
import './Button.scss';
// import { useRouter } from 'next/navigation'

const Button = ({buttonProps}) => {
  const { text, className, href, onClick, routerPath } = buttonProps;
  // const router = useRouter()

  const buttonElement = (
    <button
      className={className}
      onClick={onClick}
    >
      {text}
    </button>
  )

  if (!href) {
    return <>{buttonElement}</>
  } else {
    return <Link href={href}>{buttonElement}</Link>
  }
}

export default Button
