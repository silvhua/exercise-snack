import Link from 'next/link';
import './ActionIcon.scss';

const ActionIcon = ({ iconProps }) => {
  const { src, href, onClick, className, alt } = iconProps;

  const ImgElement = () => {
    return (
      <img
        src={src}
        className={className}
        onClick={onClick}
        alt={alt}
      />
    )
  }

  if (onClick) {
    return <ImgElement />
  } else {
    return (
      <Link href={href}>
        <ImgElement />
      </Link>
    )
  }
}

export default ActionIcon
