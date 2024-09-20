import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WalletContextProvider } from "./context/WalletContextProvider";

const gilroy = localFont({
  src: "../../public/fonts/gilroy/Gilroy-Light.ttf",
  variable: "--font-gilroy",
});
const denton = localFont({
  src: "../../public/fonts/Denton-Font-Family /Denton Test Light 300.otf",
  variable: "--font-denton",
});

export const metadata: Metadata = {
  title: "tokendelegration",
  description:
    "create, mint, transfer, delegate & burn token all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gilroy.variable} ${denton.variable}`}>
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  );
}
