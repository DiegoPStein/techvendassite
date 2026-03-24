"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; 
import { Cpu, User, LogOut, LayoutDashboard } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-2xl">
      
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
            <Cpu size={18} className="text-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase">
            Tech<span className="text-blue-500">Corp</span>
          </span>
        </Link>
      </div>
      
      {/* MENU CENTRAL DINÂMICO */}
      <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
        <Link href="/solucoes" className="hover:text-white transition-colors">Soluções</Link>
        <Link href="/documentacao" className="hover:text-white transition-colors">Documentação</Link>
        <Link href="/quem-somos" className="hover:text-white transition-colors">Quem Somos</Link>
        
        {/* APARECE APENAS SE ESTIVER LOGADO */}
        {user && (
          <Link href="/login" className="text-blue-500 hover:text-blue-400 transition-colors border-l border-slate-800 pl-8 flex items-center gap-2">
            <LayoutDashboard size={12} />
            Minha Conta
          </Link>
        )}
      </div>

      {/* ÁREA DE USUÁRIO (DIREITA) */}
      <div className="flex items-center gap-4">
        {loading ? (
          <div className="w-5 h-5 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        ) : user ? (
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <p className="text-[11px] font-bold text-slate-200 truncate max-w-[120px]">{user.email?.split('@')[0]}</p>
              <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Sessão Ativa</p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2.5 rounded-xl transition-all border border-red-500/20 group"
              title="Encerrar Sessão"
            >
              <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ) : (
          <Link href="/login" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-[11px] font-black transition-all active:scale-95 shadow-lg uppercase tracking-wider">
            <User size={14} />
            Acessar
          </Link>
        )}
      </div>
    </nav>
  );
}