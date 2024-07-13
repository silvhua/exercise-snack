"use client"

import { useEffect, useState } from "react";
import DataProvider from "@/app/context-provider";
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers

export default function TrainLayout({ children }) {
  // const [userObject, setUserObject] = useState(null);
  // const [programArray, setProgramArray] = useState(null);
  
  // useEffect(() => {
  //   const storedUserInfo = JSON.parse(localStorage.getItem('userDetails'));
  //   setUserObject(storedUserInfo);
  //   const sessionProgramArray = sessionStorage.getItem('userProgram');
  //   setProgramArray(JSON.parse(sessionProgramArray));
  // }, []);

  // if (!programArray) {
  //   return;
  // }

  return (
    <>
      this is the custom layout for (train)
        <section className="section">
          <DataProvider>{children}</DataProvider>
        </section>
    </>
  );
}
