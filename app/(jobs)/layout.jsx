"use client"

import { usePathname } from 'next/navigation'
import '@/app/_components/Header/Header.scss';

export default function JobLayout({ children }) {
  const path = usePathname();
  const companyId = path.split('-')[1];
  const fontCredit = {
    85847: (
      <>
        Icons made from <a href="https://www.onlinewebfonts.com/icon" className='p2'>svg icons</a> is licensed by CC BY 4.0
      </>
    )
  }

  const footerClass = {
    85847: "footer-wealthsimple"
  }

  return (
    <>
      {/* <HeaderJob /> */}
      {children}
      <footer className={footerClass[companyId]}>
        <div className='header-container flex-row-container'>
          <p className='p2'>{fontCredit[companyId]}</p>
          <p className='p2'>
            Check out the rest of the web app <a href='/' className='p2'>here</a>
          </p>
        </div>
      </footer>
    </>
  );
}
