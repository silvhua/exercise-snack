import Button from '../Button/Button';
// import './LogoutButton.scss';

const LogoutButton = () => {
  const buttonProps = {
    text: 'Logout',
    className: 'button--white',
    href: '/'
  }
  return (
    <>
      <Button buttonProps={buttonProps} />
    </>
  )
}

export default LogoutButton
