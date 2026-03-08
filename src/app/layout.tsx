import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dharmesh Charugundla | Software Engineer",
  description: "Dharmesh Charugundla — Software Engineer specializing in distributed systems, data warehousing, Python, and Java.",
  keywords: ["Dharmesh Charugundla", "Software Engineer", "Backend Engineer", "Distributed Systems", "Data Warehousing", "Python", "Java"],
  authors: [{ name: "Dharmesh Charugundla" }],
  openGraph: {
    title: "Dharmesh Charugundla | Software Engineer",
    description: "Software Engineer specializing in distributed systems, data warehousing, Python, and Java.",
    url: "https://dharmeshcharugundla.dev",
    siteName: "Dharmesh Charugundla",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
