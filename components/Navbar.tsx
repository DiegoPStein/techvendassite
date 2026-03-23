"use client";

import Link from "next/link";
import { ShoppingCart, Terminal } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="border-b border-slate-100 py-4 px-6 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tighter text-slate-900 hover:opacity-80 transition">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <Terminal size={20} />
          </div>
          <span>Tech<span className="text-blue-600">Corp</span></span>
        </Link>

        {/* Carrinho com Contador Dinâmico */}
        <Link href="/carrinho" className="group relative p-3 bg-slate-50 hover:bg-blue-50 rounded-2xl transition-all">
          <ShoppingCart size={22} className="text-slate-700 group-hover:text-blue-600" />
          
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}