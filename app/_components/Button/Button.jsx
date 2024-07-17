'use client'
import Link from 'next/link';
import './Button.scss';
const Button = ({buttonProps}) => {
  const { text, className, href, onClick } = buttonProps;

  const buttonElement = (
    <button
      className={`button ${className}`}
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
