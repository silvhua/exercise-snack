import './MyLinks.scss';
import LinkIcons from '../LinkIcons/LinkIcons';

const MyLinks = () => {

  const linkedinProps = {
    src: './images/jobs/linkedin.svg',
    alt: 'LinkedIn profile',
    href: 'https://www.linkedin.com/in/silviahua/'
  }

  const githubProps = {
    src: './images/jobs/github.svg',
    alt: 'GitHub profile',
    href: 'https://github.com/silvhua'
  }

  const appProps = {
    src: './icons/devices.svg',
    alt: 'My app: Movement Snack App',
    href: 'defytimefitness.com'
  }
  return (
    <div className='my-links'>
      <LinkIcons iconProps={githubProps} />
      <LinkIcons iconProps={appProps} />
      <LinkIcons iconProps={linkedinProps} />
    </div>
  )
}

export default MyLinks
