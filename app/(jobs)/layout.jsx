"use client"

import { usePathname } from 'next/navigation'
import HeaderJob from "@/app/_components/HeaderJob/HeaderJob";

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

  return (
    <>
      {/* <HeaderJob /> */}
      <main className="main--jobs">
        {children}
      </main>
      <footer>
        <p className='p2'>{fontCredit[companyId]}</p>
      </footer>
    </>
  );
}
