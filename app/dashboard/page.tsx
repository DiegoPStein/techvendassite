"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { 
  Package, ShieldCheck, Zap, LifeBuoy, Copy, CheckCircle2, ArrowRight 
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UserDashboard() {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiado, setCopiado] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserProducts() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }

      const { data: pData } = await supabase
        .from("pedidos")
        .select("*")
        .eq("cliente_email", session.user.email)
        .order("created_at", { ascending: false });

      if (pData) {
        const pedidosFormatados = pData.map(p => ({
          ...p,
          itens: typeof p.itens === 'string' ? JSON.parse(p.itens) : p.itens
        }));
        setPedidos(pedidosFormatados);
      }
      setLoading(false);
    }
    fetchUserProducts();
  }, [router]);

  const copiarLicenca = (chave: string) => {
    if (!chave) return;
    navigator.clipboard.writeText(chave);
    setCopiado(chave);
    setTimeout(() => setCopiado(null), 2000);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white text-blue-600 font-black tracking-tighter text-2xl animate-pulse uppercase">
      TECHCORP ENGINE LOAD...
    </div>
  );

  return (
    // ADICIONADO pt-24 PARA DAR ESPAÇO AO HEADER FIXO
    <main className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20 pt-24">
      <section className="max-w-7xl mx-auto p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="mb-12">
          <p className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2">Painel do Cliente</p>
          <h2 className="text-5xl font-black tracking-tighter">Minha Biblioteca</h2>
          <p className="text-slate-400 font-medium mt-2 text-lg">Gerencie seus softwares e chaves de acesso.</p>
        </div>

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              pedido.itens?.map((item: any, idx: number) => {
                const chaveReal = pedido.chave_licenca || "CHAVE-EM-PROCESSAMENTO";

                return (
                  <div key={`${pedido.id}-${idx}`} className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-blue-500 transition-all duration-300">
                    
                    <div className="p-8 pb-4">
                      <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        <Package size={28} />
                      </div>
                      <h3 className="text-2xl font-black mb-1 tracking-tight text-slate-900">{item.nome}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-3 py-1 rounded-full uppercase flex items-center gap-1 border border-emerald-100">
                          <ShieldCheck size={12} /> Licença Ativa
                        </span>
                      </div>
                    </div>

                    <div className="px-8 py-6 bg-slate-50/80 border-y border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Chave de Ativação</p>
                      <div 
                        onClick={() => copiarLicenca(chaveReal)} 
                        className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors group/key shadow-sm"
                      >
                        <code className="text-[11px] font-mono font-black text-blue-600 truncate mr-2">
                          {chaveReal}
                        </code>
                        {copiado === chaveReal ? (
                          <CheckCircle2 size={16} className="text-emerald-500 animate-in zoom-in" />
                        ) : (
                          <Copy size={16} className="text-slate-300 group-hover/key:text-blue-500 transition-colors" />
                        )}
                      </div>
                    </div>

                    <div className="p-8 mt-auto">
                      <button className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-100">
                        Acessar Software <Zap size={14} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                );
              })
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-300 font-bold border-2 border-dashed border-slate-100 rounded-[40px]">Nenhuma licença encontrada.</div>
          )}
        </div>

        {/* AJUDA E SUPORTE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-blue-600 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-200 group">
            <h4 className="text-2xl font-black tracking-tight mb-4 flex items-center gap-3">
              <LifeBuoy size={24} /> Suporte Técnico
            </h4>
            <p className="text-blue-100 font-medium mb-8">Nossa equipe está online para ajudar com a ativação das chaves.</p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
              Abrir Chamado <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl shadow-slate-200">
            <h4 className="text-2xl font-black tracking-tight mb-4 flex items-center gap-3 text-blue-400">
              <Zap size={24} fill="currentColor" /> Documentação
            </h4>
            <p className="text-slate-400 font-medium mb-8">Aprenda a configurar e extrair o máximo das suas soluções.</p>
            <button className="text-white border border-white/20 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center gap-2">
              Acessar Docs <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </section>
    </main>
  );
}