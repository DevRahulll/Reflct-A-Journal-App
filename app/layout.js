import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Reflct",
  description: "A Journaling App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body
          className={`${inter.className} bg-gradient-to-b from-orange-50 via-amber-50 to-orange-50`}
        >
          <div className="inset-0 bg-[url('/bg.jpg')] opacity-100 fixed -z-10 " />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>

          <footer className="bg-orange-300 py-12 bg-opacity-10">
            <div className="container mx-auto px-4 text-center text-gray-900">
              <p>Made by Rahul </p>
            </div>
          </footer>

        </body>
      </html>
    </ClerkProvider>
  );
}
