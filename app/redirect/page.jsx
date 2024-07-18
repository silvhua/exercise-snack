

import Placeholder from '@/app/_components/Placeholder/Placeholder';
import Button from '../_components/Button/Button';
// import './ErrorPage.scss';

const ErrorPage = () => {

  const buttonProps = {
    text: "Log out",
    href: "/"
  }
  
  return (
    <main className='main'>
      <Placeholder
        text='Sorry!'
      />
      <p>
        It appears this app is more popular than its servers can currently handle!
      </p>
      <p>
        Please check back later and hopefully things will be back.
      </p>
      <p>
        In the meantime, feel free to connect with Silvia on <a href="https://www.linkedin.com/in/silviahua/">LinkedIn</a>
      </p>
      <Button
        buttonProps={buttonProps}
      />
    </main>
  )
}

export default ErrorPage
