import MyLinks from '@/app/_components/MyLinks/MyLinks';
import './wealthsimple.scss';

const Wealthsimple = () => {
  return (
    <main className="main--jobs job-background">
      <section>
        <h1>Hi, Wealthsimple!</h1>
        <p>Thank you for helping me grow my wealth. 🙋🏻‍♀️</p>
        <img className='' src='./images/jobs/85847.PNG' />
        <h2>Check out my links</h2>
        <div className='container'>
          <MyLinks />
        </div>
        <p>PS: Pardon the plain design; I am a fullstack developer, but <i>not</i> a designer.</p>
        <p>Give me the requirements and mockup and I will do a great job!</p>
      </section>
    </main>
  )
}

export default Wealthsimple
