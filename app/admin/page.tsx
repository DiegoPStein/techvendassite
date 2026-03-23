"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, DollarSign, Lock, TrendingUp, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUserAndFetch() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/login"); return; }

      const { data, error } = await supabase
        .from("pedidos")
        .select("*")
        .order("created_at", { ascending: true }); // Ascending para o gráfico fluir no tempo

      if (!error) setPedidos(data);
      setLoading(false);
    }
    checkUserAndFetch();
  }, [router]);

  // Prepara dados para o gráfico (Soma vendas por dia)
  const dadosGrafico = pedidos.reduce((acc: any[], p) => {
    const data = new Date(p.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const existente = acc.find(item => item.name === data);
    if (existente) {
      existente.vendas += p.total;
    } else {
      acc.push({ name: data, vendas: p.total });
    }
    return acc;
  }, []);

  const faturamentoTotal = pedidos.reduce((acc, p) => acc + p.total, 0);

  if (loading) return <div className="p-20 text-center font-black animate-pulse">CARREGANDO SISTEMA...</div>;

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tighter flex items-center gap-2">
              <LayoutDashboard size={32} className="text-blue-600" /> DASHBOARD <span className="text-blue-600">PRO</span>
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Gerenciamento de Licenças TextCommander</p>
          </div>
          <button 
            onClick={async () => { await supabase.auth.signOut(); router.push("/"); }}
            className="bg-white border border-slate-200 px-6 py-2 rounded-2xl text-xs font-black hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
          >
            LOGOUT SEGURO
          </button>
        </div>

        {/* Grid de Cards Médios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <TrendingUp size={80} />
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Receita Acumulada</p>
            <h2 className="text-4xl font-black">R$ {faturamentoTotal.toFixed(2)}</h2>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Licenças Ativas</p>
            <h2 className="text-4xl font-black">{pedidos.length}</h2>
          </div>

          <div className="bg-blue-600 p-8 rounded-[32px] shadow-xl shadow-blue-100 text-white">
            <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Ticket Médio</p>
            <h2 className="text-4xl font-black">R$ {(faturamentoTotal / (pedidos.length || 1)).toFixed(2)}</h2>
          </div>
        </div>

        {/* Gráfico de Vendas */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm mb-8">
          <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2 uppercase text-sm tracking-widest">
            <Calendar size={18} className="text-blue-600" /> Histórico de Vendas (R$)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 'bold', fill: '#94A3B8'}} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="vendas" fill="#2563EB" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabela Detalhada */}
        <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest flex items-center gap-2">
                <Lock size={14} /> Transações Confirmadas
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Produtos</th>
                  <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pedidos.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-6 text-xs font-bold text-slate-400">{new Date(p.created_at).toLocaleDateString('pt-BR')}</td>
                    <td className="p-6">
                      <p className="font-black text-slate-800">{p.cliente_nome}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{p.cliente_email}</p>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-wrap gap-1">
                        {p.itens?.map((item: any, idx: number) => (
                          <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md font-bold uppercase">
                            {item.nome} x{item.quantidade}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-6 text-right font-black text-blue-600 text-lg">R$ {p.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}