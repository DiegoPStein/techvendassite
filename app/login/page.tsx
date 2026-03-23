"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErro("Acesso negado. Verifique suas credenciais.");
    } else {
      router.push("/admin"); // Se der certo, entra no cofre!
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans text-slate-900">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-blue-100/50 p-10 border border-slate-100">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">ÁREA RESTRITA</h1>
          <p className="text-slate-400 text-sm font-medium">Identifique-se para gerenciar o sistema</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-300" size={20} />
            <input
              type="email"
              placeholder="Seu e-mail de admin"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-300" size={20} />
            <input
              type="password"
              placeholder="Sua senha mestre"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {erro && <p className="text-red-500 text-xs font-black text-center uppercase tracking-widest">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-slate-200"
          >
            ENTRAR NO PAINEL <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </main>
  );
}