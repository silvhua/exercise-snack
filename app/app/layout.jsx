import Header from "./_components/Header/Header";
import NavBar from "./_components/NavBar/NavBar";
import "./globals.scss";


export const metadata = {
  title: "Movement Snack App",
  description: "Get stronger in just 30 seconds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
          <main className="main">
            {children}
          </main>
          <NavBar />
      </body>
    </html>
  );
}
