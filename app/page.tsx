"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { ArrowRight, ArrowLeft, ShieldCheck, Zap, Terminal, Sparkles, Cpu, User } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [init, setInit] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));

    async function carregarProdutos() {
      const { data } = await supabase.from("produtos").select("*").order("created_at", { ascending: false });
      if (data) setProdutos(data);
      setLoading(false);
    }
    carregarProdutos();
  }, []);

  const particlesOptions = useMemo(() => ({
    fullScreen: { enable: false },
    fpsLimit: 120,
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: { grab: { distance: 200, links: { opacity: 0.5 } } },
    },
    particles: {
      color: { value: "#3b82f6" },
      links: { color: "#3b82f6", distance: 150, enable: true, opacity: 0.15, width: 1 },
      move: { enable: true, speed: 0.8 },
      number: { density: { enable: true, area: 800 }, value: 80 },
      opacity: { value: 0.2 },
      size: { value: { min: 1, max: 2 } },
    },
  }), []);

  const scroll = (direcao: "esquerda" | "direita") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direcao === "direita" ? scrollLeft + scrollAmount : scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-hidden relative">
      
      {/* BARRA DE PROGRESSO NEON */}
      <div className="fixed top-0 left-0 h-[2px] bg-blue-500 z-[110] transition-all duration-150 shadow-[0_0_15px_#3b82f6]" style={{ width: `${scrollProgress}%` }} />


      {/* PARTÍCULAS NO FUNDO */}
      {init && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <Particles id="tsparticles" options={particlesOptions as any} className="w-full h-full" />
        </div>
      )}

      <div className="relative z-10 pt-20">
        
        {/* HERO SECTION */}
        <section className="px-6 pt-24 pb-20 text-center max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-200/50 px-4 py-1.5 rounded-full mb-8">
            <Sparkles size={14} className="text-blue-600 animate-pulse" />
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Next-Gen Intelligence</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-slate-950">
            Tech<span className="text-blue-600 drop-shadow-[0_0_20px_rgba(37,99,235,0.15)]">Corp</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Sediada no Brasil, a TechCorp desenvolve tecnologias que simplificam o complexo. Transformamos fluxos de trabalho através de softwares intuitivos de alta performance.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#produtos" className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-600 hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl uppercase tracking-widest text-xs">
              Explorar Ecossistema
            </a>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap />, title: "Alta Velocidade", desc: "Execute tarefas críticas instantaneamente com motores de processamento otimizados." },
              { icon: <ShieldCheck />, title: "Estabilidade", desc: "Sistemas resilientes focados em segurança e integridade de dados corporativos." },
              { icon: <Terminal />, title: "Interface Clean", desc: "Design minimalista focado na experiência do usuário e na redução de ruídos." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/70 backdrop-blur-xl border border-white rounded-[32px] shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-500 group animate-in fade-in slide-in-from-bottom-8">
                <div className="bg-slate-950 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:bg-blue-600 transition-colors duration-500 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="font-black text-xl mb-3 tracking-tight text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUTOS */}
        <section id="produtos" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-2 block animate-pulse">Portfólio 2026</span>
              <h2 className="text-5xl font-black tracking-tighter text-slate-950 uppercase">Escolha seu Poder</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={() => scroll("esquerda")} className="p-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-90"><ArrowLeft size={24} /></button>
              <button onClick={() => scroll("direita")} className="p-4 rounded-2xl bg-slate-950 text-white hover:bg-blue-600 transition-all shadow-lg active:scale-90"><ArrowRight size={24} /></button>
            </div>
          </div>
          
          <div ref={scrollRef} className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-10 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {produtos.map((prod) => (
              <div key={prod.id} className="snap-start min-w-[85vw] md:min-w-[480px] group bg-white border border-slate-100 rounded-[48px] p-12 transition-all duration-500 flex flex-col shadow-xl hover:shadow-2xl hover:border-blue-500/30">
                <div className="w-16 h-16 bg-slate-50 rounded-3xl mb-8 flex items-center justify-center text-slate-300 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all duration-500 shadow-inner">
                  <Terminal size={32} />
                </div>
                <h3 className="text-4xl font-black mb-4 text-slate-900 tracking-tighter">{prod.nome}</h3>
                <p className="text-slate-500 font-medium mb-12 flex-grow leading-relaxed italic text-lg">{prod.descricao}</p>
                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                  <div>
                    <span className="block text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-1">Standard License</span>
                    <span className="text-4xl font-black text-slate-950 tracking-tighter">R$ {parseFloat(prod.preco).toFixed(2)}</span>
                  </div>
                  <Link href={`/produto/${prod.slug}`} className="bg-slate-950 text-white p-5 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95 group/btn">
                    <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </main>
  );
}