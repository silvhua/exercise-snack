import "./globals.scss";
import { ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} 
  from "@clerk/nextjs";

export const metadata = {
  title: "Movement Snack App",
  description: "Get stronger in just 30 seconds",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
