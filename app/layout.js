import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NextTopLoader from 'nextjs-toploader';
import ConditionalNavigation from "@/components/ConditionalNavigation";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "e-menu.bg - Digital Restaurant Menus",
  description: "Create and manage your restaurant's digital menu easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bg">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <NextTopLoader 
              color="#2299DD"
              showSpinner={false}
            />
            <ConditionalNavigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        />
      </body>
    </html>
  );
}
