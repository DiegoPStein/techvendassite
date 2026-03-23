import Header from "@/components/Header";
import Footer from "@/components/Footer"; // 1. Importe o componente aqui
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TextCommander | SoftStore",
  description: "Venda de softwares premium",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-br"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-white min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          
          {/* O flex-grow garante que o conteúdo empurre o footer para o fim da tela */}
          <main className="flex-grow">
            {children}
          </main>

          <Footer /> {/* 2. Adicione o Footer aqui */}
          
        </CartProvider>
      </body>
    </html>
  );
}