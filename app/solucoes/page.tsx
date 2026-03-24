"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { 
  Layout, 
  ArrowRight, 
  ShoppingCart, 
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu
} from "lucide-react";
import Link from "next/link";
import ModalLogin from "@/components/ModalLogin";

export default function SolucoesPage() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [adicionadoId, setAdicionadoId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProdutos() {
      const { data } = await supabase
        .from("produtos")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (data) setProdutos(data);
      setLoading(false);
    }

    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    }

    fetchProdutos();
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, produto: any) => {
    e.preventDefault(); 
    if (!user) {
      setIsModalOpen(true);
      return;
    }

    addToCart({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
    });

    setAdicionadoId(produto.id);
    setTimeout(() => setAdicionadoId(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-1 bg-slate-200 overflow-hidden rounded-full">
            <div className="w-full h-full bg-blue-600 animate-[loading_1.5s_infinite_ease-in-out]"></div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">Sincronizando Banco de Dados...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-24 font-sans text-slate-900 overflow-x-hidden">
      
      {/* HEADER DA PÁGINA - DARK TECH STYLE */}
      <section className="pt-40 pb-20 px-8 bg-slate-950 text-white relative overflow-hidden">
        {/* Efeito de luz ao fundo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full mb-8 border border-blue-500/30 backdrop-blur-md">
            <Cpu size={14} className="animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Catálogo de Alta Performance</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            Soluções <span className="text-blue-500 italic">Core</span>
          </h1>
          <p className="text-slate-400 max-w-2xl font-medium text-lg italic leading-relaxed">
            Explore nossa infraestrutura de software. Sistemas desenvolvidos para escalar sua operação com precisão matemática e segurança total.
          </p>
        </div>
      </section>

      {/* GRID DINÂMICO */}
      <section className="px-8 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtos.map((produto) => (
              <div 
                key={produto.id} 
                className="group bg-white rounded-[40px] border border-slate-200 p-10 flex flex-col transition-all duration-500 hover:border-blue-500 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] relative"
              >
                {/* Badge de Ativo */}
                <div className="absolute top-8 right-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Sistema Ativo</span>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="bg-slate-950 text-white w-16 h-16 rounded-[24px] flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                    <Zap size={28} />
                  </div>

                  <Link href={`/produto/${produto.slug}`} className="block group/title">
                    <h3 className="text-3xl font-black tracking-tighter text-slate-900 mb-4 group-hover/title:text-blue-600 transition-colors">
                      {produto.nome}
                    </h3>
                  </Link>

                  <p className="text-slate-500 font-medium mb-8 line-clamp-2 italic text-sm leading-relaxed">
                    {produto.descricao}
                  </p>

                  <div className="space-y-4 mb-10 flex-1">
                    {/* Features sutilmente destacadas */}
                    <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-600 transition-colors">
                      <ShieldCheck size={16} className="text-blue-500" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Segurança Bancária</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-600 transition-colors">
                      <Zap size={16} className="text-blue-500" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Cloud Integrado</span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Licença Única</p>
                      <p className="text-3xl font-black text-slate-900 tracking-tighter">
                        <span className="text-blue-600 text-sm mr-1">R$</span>
                        {parseFloat(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Link 
                        href={`/produto/${produto.slug}`}
                        className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-950 hover:text-white transition-all shadow-inner"
                      >
                        <ArrowRight size={22} />
                      </Link>

                      <button 
                        onClick={(e) => handleAddToCart(e, produto)}
                        className={`w-14 h-14 rounded-2xl transition-all duration-500 flex items-center justify-center shadow-xl ${
                          adicionadoId === produto.id 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-blue-600 text-white hover:bg-slate-950 hover:-translate-y-1'
                        }`}
                      >
                        {adicionadoId === produto.id ? <CheckCircle2 size={24} /> : <ShoppingCart size={24} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ModalLogin 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}