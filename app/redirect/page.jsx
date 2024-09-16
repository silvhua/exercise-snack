

import Placeholder from '@/app/_components/Placeholder/Placeholder';
import Button from '../_components/Button/Button';
import Video from '../_components/Video/Video';
import Header from "@/app/_components/Header/Header";
// import './ErrorPage.scss';

const ErrorPage = () => {

  const buttonProps = {
    text: "Log out",
    href: "/"
  }
  return (
    <>
      <Header />
      <main className='main'>
        <Placeholder
          text='Sorry!'
        />
        <section className='responsive-section'>
          <div className='responsive-column--50'>
            <p>
              It appears this app is more popular than its servers can currently handle!
            </p>
            <p>
              Please check back later and hopefully things will be back.
            </p>
            <p>
              In the meantime, feel free to connect with Silvia on <a href="https://www.linkedin.com/in/silviahua/">LinkedIn</a>.
              You can even do 10 squats in the meantime!
            </p>

          </div>
          <div className='responsive-column--50'>
            <Video
              src='youtu.be/lVvU5imXqNU'
              text='goblet squat with suitcase'
              className='video--responsive'
            />
          </div>
        </section>
        <Button
          buttonProps={buttonProps}
        />
      </main>
    </>
  )
}

export default ErrorPage
