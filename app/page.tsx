"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ShieldCheck, Zap, Terminal, Sparkles } from "lucide-react";

const produtos = [
  { 
    id: 'textcommander-lite', 
    slug: 'textcommander-lite', 
    nome: 'TextCommander Lite', 
    preco: 19.90, 
    descricao: 'Sistema inteligente para automação de textos básicos e produtividade.' 
  },
  { 
    id: 'textcommander-pro', 
    slug: 'textcommander-pro', 
    nome: 'TextCommander Pro', 
    preco: 39.90, 
    descricao: 'Potência máxima de automação de textos com IA avançada para comandos complexos e fluxos de trabalho.' 
  },
  { 
    id: 'textcommander-litex', 
    slug: 'textcommander-litex', 
    nome: 'TextCommander LiteX', 
    preco: 29.90, 
    descricao: 'Versão free do TextCommander Lite sem precisar instalar e diretamente no seu navegador.' 
  },
  // Quando quiser adicionar mais, basta colocar novos objetos aqui embaixo:
];

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direcao: "esquerda" | "direita") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // Move 80% da tela para um scroll suave
      
      scrollRef.current.scrollTo({
        left: direcao === "direita" ? scrollLeft + scrollAmount : scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFF] text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* --- EFEITO DE FUNDO TECNOLÓGICO --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10" />

      {/* --- HERO SECTION --- */}
      <section className="px-6 pt-32 pb-20 text-center max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-8 shadow-sm">
          <Sparkles size={14} className="text-blue-600 animate-pulse" />
          <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Sistemas de Próxima Geração</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          Tech<span className="text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.2)]">Corp</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Sediada no Brasil, a TechCorp desenvolve tecnologias que simplificam o complexo. Transformamos fluxos de trabalho através de softwares intuitivos de alta performance.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#produtos" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-600 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
            Explorar Softwares
          </a>
          <button className="bg-white border border-slate-200 px-10 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            Documentações
          </button>
        </div>
      </section>

      {/* --- DIFERENCIAIS (GLASSMORPHISM) --- */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-8 bg-white/40 backdrop-blur-md border border-white rounded-[32px] shadow-sm hover:shadow-md transition-all group">
            <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
              <Zap className="text-white" size={24} />
            </div>
            <h3 className="font-black text-lg mb-3 tracking-tight">Alta Velocidade</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">Execute tarefas críticas instantaneamente com motores de processamento otimizados.</p>
          </div>

          <div className="p-8 bg-white/40 backdrop-blur-md border border-white rounded-[32px] shadow-sm hover:shadow-md transition-all group">
            <div className="bg-slate-900 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-200 group-hover:rotate-12 transition-transform">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <h3 className="font-black text-lg mb-3 tracking-tight">Estabilidade</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">Sistemas resilientes focados em segurança e integridade de dados corporativos.</p>
          </div>

          <div className="p-8 bg-white/40 backdrop-blur-md border border-white rounded-[32px] shadow-sm hover:shadow-md transition-all group">
            <div className="bg-blue-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-100 group-hover:rotate-12 transition-transform">
              <Terminal className="text-white" size={24} />
            </div>
            <h3 className="font-black text-lg mb-3 tracking-tight">Interface Clean</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">Design minimalista focado na experiência do usuário e na redução de ruídos cognitivos.</p>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO DE PRODUTOS COM ROLAGEM --- */}
      <section id="produtos" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-4xl font-black tracking-tight mb-2">Escolha seu Poder</h2>
            <div className="w-12 h-1.5 bg-blue-600 rounded-full" />
          </div>

          {/* BOTÕES DE NAVEGAÇÃO */}
          <div className="flex gap-2">
            <button 
              onClick={() => scroll("esquerda")}
              className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
              aria-label="Anterior"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("direita")}
              className="p-4 rounded-2xl bg-slate-900 text-white hover:bg-blue-600 transition-all active:scale-95 shadow-md"
              aria-label="Próximo"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        
        {/* CONTAINER DO CARROSSEL */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-10 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {produtos.map((prod) => (
            <div 
              key={prod.id} 
              className="snap-start min-w-[85vw] md:min-w-[450px] group relative bg-white border border-slate-100 rounded-[40px] p-10 hover:border-blue-400 transition-all duration-500 flex flex-col shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="absolute top-6 right-10 text-slate-100 group-hover:text-blue-50 transition-colors pointer-events-none">
                <Terminal size={60} />
              </div>

              <h3 className="text-3xl font-black mb-4 text-slate-900 z-10">{prod.nome}</h3>
              <p className="text-slate-500 font-medium mb-12 flex-grow leading-relaxed z-10 pr-10">
                {prod.descricao}
              </p>
              
              <div className="flex items-end justify-between z-10 mt-auto">
                <div>
                  <span className="block text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-1">Licença Vitalícia</span>
                  <span className="text-3xl font-black text-slate-900 tracking-tight">R$ {prod.preco.toFixed(2)}</span>
                </div>
                
                <Link 
                  href={`/produto/${prod.slug}`}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2 group/btn active:scale-95 shadow-lg shadow-slate-100"
                >
                  Saiba mais. <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER SIMPLES --- */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-xs font-black text-slate-300 uppercase tracking-[0.3em]">© 2026 TechCorp Soluções Digitais</p>
      </footer>
    </main>
  );
}