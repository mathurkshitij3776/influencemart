import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "../Context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Notes App",
  description: "A simple notes application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}