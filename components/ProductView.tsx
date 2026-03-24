"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, ArrowLeft, Layers, Cpu, Terminal } from "lucide-react";
import ModalLogin from "@/components/ModalLogin";
import Link from "next/link";

interface ProductViewProps {
  produto: {
    id: string;
    nome: string;
    preco: number;
    descricao: string;
    features: string[];
  };
}

export default function ProductView({ produto }: ProductViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleComprar = () => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    addToCart({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
    });
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* VOLTAR SUTIL */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-12 font-black text-[10px] uppercase tracking-[0.2em] group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Voltar ao Ecossistema
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LADO ESQUERDO: INFOS DO PRODUTO */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full mb-8 shadow-sm">
              <Zap size={14} className="text-blue-600 animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Next-Gen Software</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-950 mb-8 leading-[0.85]">
              {produto.nome.split(' ')[0]}
              <span className="text-blue-600 block">{produto.nome.split(' ').slice(1).join(' ')}</span>
            </h1>
            
            <p className="text-xl text-slate-500 font-medium leading-relaxed italic mb-12 max-w-lg">
              {produto.descricao}
            </p>

            {/* FEATURES COM MAIS ESTILO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {produto.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm group hover:border-blue-200 transition-colors">
                  <div className="bg-blue-50 text-blue-600 p-1 rounded-lg">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-sm text-slate-700 font-bold tracking-tight">{feature}</span>
                </div>
              ))}
            </div>

            {/* BADGES TÉCNICAS SUTIS */}
            <div className="flex gap-6 border-t border-slate-200 pt-8">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tecnologia</span>
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Cpu size={16} className="text-blue-600" /> Latência Zero
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Interface</span>
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Layers size={16} className="text-blue-600" /> Clean Design
                    </div>
                </div>
            </div>
          </div>

          {/* LADO DIREITO: CARD DE CHECKOUT ESTILO "FLOATING" */}
          <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-150 lg:sticky lg:top-32">
            <div className="bg-white border border-slate-200 p-12 rounded-[56px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] relative overflow-hidden">
              
              {/* DECORAÇÃO DE FUNDO SUTIL */}
              <div className="absolute -top-10 -right-10 text-slate-50 pointer-events-none">
                <Terminal size={200} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] block mb-2">Acesso Vitalício</span>
                        <h3 className="text-2xl font-black text-slate-950 tracking-tighter">Licença Business</h3>
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                        Disponível
                    </div>
                </div>

                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-2xl font-bold text-slate-400 italic">R$</span>
                  <span className="text-7xl font-black text-slate-950 tracking-tighter leading-none">
                    {produto.preco.toFixed(2)}
                  </span>
                </div>

                <button 
                  onClick={handleComprar}
                  className="w-full bg-slate-950 text-white py-7 rounded-[28px] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-2xl hover:shadow-blue-200 active:scale-95 group mb-8"
                >
                  Ativar Software <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-t border-slate-50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <ShieldCheck size={14} /> Garantia
                        </span>
                        <span className="text-[10px] font-black text-slate-900 uppercase">7 Dias Incondicional</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-t border-slate-50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <Globe size={14} /> Suporte
                        </span>
                        <span className="text-[10px] font-black text-slate-900 uppercase">24/7 Priority Ticket</span>
                    </div>
                </div>
              </div>
            </div>
            
            {/* TEXTO DE SEGURANÇA ABAIXO DO CARD */}
            <p className="text-center mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
               <ShieldCheck size={12} /> Pagamento Criptografado de Ponta a Ponta
            </p>
          </div>
        </div>
      </div>

      <ModalLogin 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}