"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingCart, Terminal } from "lucide-react"; // Ícones modernos

export default function Header() {
  const { cart } = useCart();
  const router = useRouter();

  // Cálculo de itens (mantendo sua lógica original, mas simplificada)
  const totalItens = cart.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* LOGO - Trocamos o h2 por um design mais "Tech" */}
        <div 
          className="flex cursor-pointer items-center gap-2" 
          onClick={() => router.push("/")}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <Terminal size={22} />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-slate-900">
            Text<span className="text-blue-600">Commander</span>
          </h1>
        </div>

        {/* CARRINHO - Agora com badge flutuante */}
        <div
          className="group relative cursor-pointer rounded-2xl bg-slate-50 p-3 transition-all hover:bg-blue-50"
          onClick={() => router.push("/carrinho")}
        >
          <ShoppingCart size={24} className="text-slate-700 transition-colors group-hover:text-blue-600" />
          
          {totalItens > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[10px] font-bold text-white shadow-sm">
              {totalItens}
            </span>
          )}
        </div>

      </div>
    </header>
  );
}