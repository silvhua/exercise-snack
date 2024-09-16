
import HeaderJob from "@/app/_components/HeaderJob/HeaderJob";

export default function JobLayout({ children }) {
  return (
    <>
      <HeaderJob />
      <main className="main">
        {children}
      </main>
    </>
  );
}
