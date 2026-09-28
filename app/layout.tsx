import type { Metadata } from "next";
import { Smooch_Sans } from "next/font/google";
import "./globals.css";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

const smooch = Smooch_Sans({
  variable: "--font-smooch",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZZEIM® Fashion",
  description: "Your store description",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${smooch.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <TopBar />
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
