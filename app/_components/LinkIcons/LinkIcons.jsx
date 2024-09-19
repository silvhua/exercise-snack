import './LinkIcons.scss';

const LinkIcons = ({ iconProps }) => {
  const {
    src, alt, href
  } = iconProps;
  return (
    <a href={href}>
      <img src={src} alt={alt} className='link-icon' title={alt} />
    </a>
  )
}

export default LinkIcons
