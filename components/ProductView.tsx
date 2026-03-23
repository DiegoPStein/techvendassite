"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation"; // 👈 Importe o roteador
import { CheckCircle, Zap, ArrowRight, Star, Terminal } from "lucide-react";

export default function ProductView({ produto }: { produto: any }) {
  const { addToCart } = useCart();
  const router = useRouter(); // 👈 Inicialize o roteador

  const handleComprar = () => {
    // 1. Adiciona ao carrinho
    addToCart({ 
      id: produto.id, 
      nome: produto.nome, 
      preco: produto.preco 
    });

    // 2. Redireciona para a página do carrinho automaticamente
    router.push("/carrinho"); // 👈 O "pulo do gato" está aqui
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Lado Esquerdo: Visual */}
        <div className="relative bg-slate-50 rounded-[40px] p-20 flex flex-col items-center justify-center border border-slate-100 shadow-inner">
          <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-50 flex items-center justify-center mb-6">
            <Terminal size={100} className="text-blue-600" />
          </div>
          <p className="text-slate-500 font-semibold uppercase tracking-widest text-[10px]">Trusted by 2,000+ devs</p>
        </div>

        {/* Lado Direito: Info */}
        <div className="flex flex-col pt-4">
          <h1 className="text-6xl font-black text-slate-900 mb-6 leading-[1.1]">
            {produto.nome}
          </h1>
          
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            {produto.descricao} Acelere seu fluxo de trabalho agora mesmo.
          </p>

          <div className="flex items-center gap-8 p-2">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">Preço Único</p>
              <p className="text-4xl font-black text-slate-900">R$ {produto.preco.toFixed(2)}</p>
            </div>
            
            {/* Trocamos a lógica do onClick para a nossa nova função */}
            <button 
              onClick={handleComprar} 
              className="flex-grow bg-blue-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 hover:shadow-2xl transition-all active:scale-95 shadow-lg shadow-blue-100"
            >
              Comprar Agora
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}