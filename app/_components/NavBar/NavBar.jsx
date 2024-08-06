import './NavBar.scss';
import ActionIcon from '../ActionIcon/ActionIcon';


const NavBar = () => {

  const homeIconProps = {
    src: '/icons/home.svg',
    href: '/dashboard',
    className: 'nav-bar__icon',
    alt: 'home icon',
    title: 'Home'
  }

  const profileIconProps = {
    src: '/icons/person.svg',
    href: '/me',
    className: 'nav-bar__icon',
    alt: 'profile icon',
    title: 'Me'
  }

  const dataIconProps = {
    src: '/icons/barChart.svg',
    href: '/stats',
    className: 'nav-bar__icon',
    alt: 'bar chart icon',
    title: 'Stats'
  }

  const logoutIconProps = {
    src: '/icons/logout.svg',
    href: '/',
    className: 'nav-bar__icon',
    alt: 'logout icon',
    title: 'Logout'
  }
  
  return (
    <section className='nav-bar'>
      <nav className='nav-bar__container'>
        <ActionIcon iconProps={homeIconProps} />
        <ActionIcon iconProps={profileIconProps} />
        <ActionIcon iconProps={dataIconProps} />
        <ActionIcon iconProps={logoutIconProps} />
      </nav>
    </section>
  )
}

export default NavBar
