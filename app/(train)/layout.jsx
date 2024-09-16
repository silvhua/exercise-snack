"use client"

import DataProvider from "@/app/context-provider";
import NavBar from "@/app/_components/NavBar/NavBar";
import Header from "@/app/_components/Header/Header";

// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers

export default function TrainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="main">
        <DataProvider>{children}</DataProvider>
      </main>
      <NavBar />
    </>
  );
}
