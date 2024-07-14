"use client"

import { useEffect, useState } from "react";
import DataProvider from "@/app/context-provider";
// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers

export default function TrainLayout({ children }) {
  return (
    <>
      <DataProvider>{children}</DataProvider>
    </>
  );
}
