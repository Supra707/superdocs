import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "SuperDocs: Collaborative Rich Text Editor",
  description: "Experience seamless collaboration with SuperDocs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900 w-full min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
      <Toaster />
    </html>
  );
}
