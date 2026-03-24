"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight, Terminal, Cpu, Sparkles } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); 
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error("Credenciais inválidas.");

        const adminEmail = "diegopereirastein@gmail.com"; 

        if (email.toLowerCase() === adminEmail.toLowerCase()) {
          router.push("/admin");
          return; 
        }

        router.push(callbackUrl);

      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Conta criada! Verifique seu e-mail para confirmar.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Efeito de Luz de Fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[450px] relative z-10 animate-in fade-in zoom-in duration-700">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full mb-6 border border-blue-500/30 backdrop-blur-md">
            <Sparkles size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Secure Access Protocol</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">
            Tech<span className="text-blue-500">Gate</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm italic">
            {isLogin ? "Autentique-se para acessar o ecossistema." : "Inicie sua jornada na TechCorp."}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[48px] border border-white/10 shadow-2xl">
          <form onSubmit={handleAuth} className="space-y-5">
            <div className="relative group">
              <Mail className="absolute left-5 top-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="email"
                placeholder="Identificador (E-mail)"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-5 pl-14 pr-4 font-bold text-sm text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-5 top-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="password"
                placeholder="Chave de Acesso"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-5 pl-14 pr-4 font-bold text-sm text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {erro && (
              <p className="text-red-400 text-[10px] font-black text-center uppercase tracking-widest bg-red-500/10 border border-red-500/20 py-3 rounded-xl">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-black py-6 rounded-2xl hover:bg-blue-500 disabled:bg-slate-800 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-blue-900/20 mt-4 uppercase tracking-widest text-xs"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Iniciar Sessão" : "Finalizar Registro"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black text-slate-500 hover:text-white transition-colors uppercase tracking-[0.3em]"
            >
              {isLogin ? "// Não possui credenciais? Criar" : "// Já possui acesso? Login"}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center opacity-30">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em]">Encrypted by TechCorp Defense Systems</p>
        </div>
      </div>
    </main>
  );
}