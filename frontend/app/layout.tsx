import type { Metadata } from "next";
import { Geist, Geist_Mono, Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo2 = Baloo_2({
  variable: "--font-baloo-2",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Motiv - AI Mental Health Companion",
  description:
    "Your compassionate AI companion for mental wellness and emotional support. Connect anonymously, share your feelings, and find comfort in our supportive community.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/motiv.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/motiv.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baloo2.variable} ${nunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
