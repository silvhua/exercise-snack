import './NavBar.scss';
import ActionIcon from '../ActionIcon/ActionIcon';


const NavBar = () => {

  const homeIconProps = {
    src: '/icons/home.svg',
    href: '/dashboard',
    className: 'nav-icons',
    alt: 'home icon'
  }

  const profileIconProps = {
    src: '/icons/person.svg',
    href: '/dashboard',
    className: 'nav-icons',
    alt: 'profile icon'
  }

  const dataIconProps = {
    src: '/icons/barChart.svg',
    href: '/dashboard',
    className: 'nav-icons',
    alt: 'bar chart icon'
  }
  
  return (
    <section className='nav-bar'>
      <nav className='nav-bar__container'>
        <ActionIcon iconProps={homeIconProps} />
        <ActionIcon iconProps={profileIconProps} />
        <ActionIcon iconProps={dataIconProps} />
      </nav>
    </section>
  )
}

export default NavBar
