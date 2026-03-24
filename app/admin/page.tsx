"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, TrendingUp, Package, Plus, Trash2, LogOut, 
  ChevronRight, Edit3, UserCheck, ShoppingBag, ShieldCheck, Zap, Copy, 
  CheckCircle2, Download, ChevronLeft 
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const [abaAtiva, setAbaAtiva] = useState<"vendas" | "produtos" | "compras">("vendas");
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [autorizado, setAutorizado] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [copiado, setCopiado] = useState<string | null>(null);
  const router = useRouter();

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formProd, setFormProd] = useState({
    nome: "", preco: "", slug: "", descricao: "", features: ""
  });

  useEffect(() => {
    async function checkAuthAndFetch() {
      const { data: { session } } = await supabase.auth.getSession();
      const adminEmail = "diegopereirastein@gmail.com";

      if (!session || session.user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
        router.replace("/login"); // Ajustado para /login conforme nossa mudança anterior
        return;
      }

      setAutorizado(true);
      setUserEmail(session.user.email || "");

      try {
        const { data: pData } = await supabase.from("pedidos").select("*").order("created_at", { ascending: false });
        if (pData) {
          const pedidosFormatados = pData.map(p => ({
            ...p,
            itens: typeof p.itens === 'string' ? JSON.parse(p.itens) : p.itens
          }));
          setPedidos(pedidosFormatados);
        }

        const { data: prodData } = await supabase.from("produtos").select("*").order("created_at", { ascending: false });
        if (prodData) setProdutos(prodData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }
    checkAuthAndFetch();
  }, [router]);

  const exportarParaExcel = () => {
    const cabecalho = ["ID", "Cliente", "Data", "Valor", "Status"];
    const linhas = pedidos.map(p => [
      p.id,
      p.cliente_email,
      new Date(p.created_at).toLocaleDateString('pt-BR'),
      p.total.toFixed(2),
      "Aprovado"
    ]);

    const csvContent = [cabecalho, ...linhas].map(e => e.join(";")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `relatorio_vendas_techcorp_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const pedidosPaginados = pedidos.slice(indicePrimeiroItem, indiceUltimoItem);
  const totalPaginas = Math.ceil(pedidos.length / itensPorPagina);

  const copiarLicenca = (chave: string) => {
    navigator.clipboard.writeText(chave);
    setCopiado(chave);
    setTimeout(() => setCopiado(null), 2000);
  };

  async function salvarProduto() {
    if (!formProd.nome || !formProd.preco || !formProd.slug) return alert("Preencha os campos obrigatórios!");
    const payload = {
      nome: formProd.nome,
      preco: parseFloat(formProd.preco),
      slug: formProd.slug,
      descricao: formProd.descricao,
      features: formProd.features.split(",").map(f => f.trim())
    };

    if (editandoId) {
      await supabase.from("produtos").update(payload).eq("id", editandoId);
    } else {
      await supabase.from("produtos").insert([payload]);
    }
    window.location.reload();
  }

  async function excluirProduto(id: string, nome: string) {
    if (confirm(`Diretor, confirma a exclusão de "${nome}"?`)) {
      await supabase.from("produtos").delete().eq("id", id);
      setProdutos(produtos.filter(p => p.id !== id));
    }
  }

  if (!autorizado) return null;
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white text-blue-600 font-black tracking-tighter text-2xl animate-pulse uppercase">
      TECHCORP ENGINE LOAD...
    </div>
  );

  const faturamentoTotal = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);
  const minhasCompras = pedidos.filter(p => p.cliente_email?.toLowerCase() === userEmail.toLowerCase());

  return (
    // ADICIONADO pt-20 PARA COMPENSAR O HEADER FIXO
    <main className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 pt-20">
      
      {/* SIDEBAR AJUSTADA: top-20 PARA FICAR ABAIXO DO HEADER */}
      <aside className="w-72 bg-white border-r border-slate-200 p-8 flex flex-col hidden md:flex sticky top-20 h-[calc(100vh-80px)]">
        <div className="mb-12">
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <LayoutDashboard size={24} className="text-blue-600" /> TECH<span className="text-blue-600">CORP</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic text-blue-500">SaaS Control Center</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button onClick={() => {setAbaAtiva("vendas"); setPaginaAtual(1);}} className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold text-sm transition-all ${abaAtiva === 'vendas' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>
            <div className="flex items-center gap-3"><TrendingUp size={18} /> Vendas</div>
          </button>
          <button onClick={() => setAbaAtiva("produtos")} className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold text-sm transition-all ${abaAtiva === 'produtos' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>
            <div className="flex items-center gap-3"><Package size={18} /> Catálogo</div>
          </button>
          <div className="pt-4 mt-4 border-t border-slate-100">
            <button onClick={() => setAbaAtiva("compras")} className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold text-sm transition-all ${abaAtiva === 'compras' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>
              <div className="flex items-center gap-3"><ShoppingBag size={18} /> Minhas Compras</div>
            </button>
          </div>
        </nav>

        <button onClick={async () => { await supabase.auth.signOut(); router.push("/"); }} className="mt-auto flex items-center gap-3 p-4 text-slate-400 font-bold hover:text-red-600 transition-colors">
          <LogOut size={18} /> Sair do Painel
        </button>
      </aside>

      {/* CONTEÚDO */}
      <section className="flex-1 p-8 md:p-12 overflow-y-auto">
        
        {abaAtiva === "vendas" && (
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h2 className="text-4xl font-black tracking-tighter text-slate-900">Intelligence <span className="text-blue-600">Center</span></h2>
                <p className="text-slate-400 font-medium italic">Dados agregados de faturamento e licenças.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={exportarParaExcel}
                  className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                >
                  <Download size={16} /> Exportar Excel
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.2em]">Faturamento Total</p>
                <h3 className="text-4xl font-black text-slate-900 leading-none">
                  <span className="text-blue-600 text-2xl mr-1 font-bold italic font-mono">R$</span>
                  {faturamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h3>
              </div>
              <div className="bg-slate-900 p-8 rounded-[40px] shadow-2xl shadow-blue-100">
                <p className="text-blue-400 text-[10px] font-black uppercase mb-4 tracking-[0.2em]">Total de Vendas</p>
                <h3 className="text-5xl font-black text-white leading-none">{pedidos.length}</h3>
              </div>
              <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-[0.2em]">Página Atual</p>
                <h3 className="text-4xl font-black text-slate-900 leading-none">
                  {paginaAtual} <span className="text-slate-300 text-2xl font-light">/ {totalPaginas}</span>
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 font-black uppercase text-[10px] tracking-widest border-b border-slate-100 bg-slate-50/50">
                      <th className="p-8">Identificação</th>
                      <th className="p-8">Data</th>
                      <th className="p-8">Status</th>
                      <th className="p-8 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {pedidosPaginados.map((p) => {
                      const isDiretor = p.cliente_email?.toLowerCase() === userEmail.toLowerCase();
                      return (
                        <tr key={p.id} className={`group transition-all hover:bg-blue-50/30 ${isDiretor ? 'bg-slate-50/50' : ''}`}>
                          <td className="p-8">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm uppercase ${isDiretor ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-slate-100 text-slate-400'}`}>
                                {p.cliente_email?.charAt(0)}
                              </div>
                              <div>
                                <p className="font-black text-sm text-slate-900">{p.cliente_email}</p>
                                {isDiretor && <span className="text-[8px] font-black px-2 py-0.5 bg-blue-100 text-blue-600 rounded-md uppercase">Root Admin</span>}
                              </div>
                            </div>
                          </td>
                          <td className="p-8">
                            <p className="text-sm font-bold text-slate-500 font-mono italic">{new Date(p.created_at).toLocaleDateString('pt-BR')}</p>
                          </td>
                          <td className="p-8">
                            <span className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full w-fit uppercase border border-emerald-100">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Aprovada
                            </span>
                          </td>
                          <td className="p-8 text-right font-black text-lg">R$ {p.total.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-8 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Exibindo {pedidosPaginados.length} de {pedidos.length} resultados
                </p>
                <div className="flex gap-2">
                  <button 
                    disabled={paginaAtual === 1}
                    onClick={() => setPaginaAtual(prev => prev - 1)}
                    className="p-4 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="flex gap-1">
                    {[...Array(totalPaginas)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPaginaAtual(i + 1)}
                        className={`w-12 h-12 rounded-xl font-black text-xs transition-all ${paginaAtual === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button 
                    disabled={paginaAtual === totalPaginas}
                    onClick={() => setPaginaAtual(prev => prev + 1)}
                    className="p-4 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 disabled:opacity-30 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {abaAtiva === "produtos" && (
          <div className="max-w-6xl mx-auto">
             <h2 className="text-3xl font-black mb-8 tracking-tight">Gerenciar Catálogo</h2>
             <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input type="text" placeholder="Nome" value={formProd.nome} onChange={e => setFormProd({...formProd, nome: e.target.value})} className="bg-slate-50 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-600" />
                <input type="text" placeholder="Slug" value={formProd.slug} onChange={e => setFormProd({...formProd, slug: e.target.value})} className="bg-slate-50 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-600" />
                <input type="number" placeholder="Preço" value={formProd.preco} onChange={e => setFormProd({...formProd, preco: e.target.value})} className="bg-slate-50 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <textarea placeholder="Descrição..." value={formProd.descricao} onChange={e => setFormProd({...formProd, descricao: e.target.value})} className="w-full bg-slate-50 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-600 h-24 mb-4" />
              <input type="text" placeholder="Features (vírgulas)" value={formProd.features} onChange={e => setFormProd({...formProd, features: e.target.value})} className="w-full bg-slate-50 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-600 mb-6" />
              <button onClick={salvarProduto} className="w-full bg-blue-600 p-5 rounded-2xl font-black text-white hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100">
                {editandoId ? <><Edit3 size={20} /> ATUALIZAR</> : <><Plus size={20} /> CADASTRAR PRODUTO</>}
              </button>
            </div>

            <div className="grid gap-4">
              {produtos.map((p) => (
                <div key={p.id} className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center justify-between group hover:border-blue-400 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl text-slate-400 group-hover:text-blue-600"><Package size={24} /></div>
                    <div>
                      <h4 className="font-black text-slate-900">{p.nome}</h4>
                      <p className="text-xs font-bold text-blue-600 uppercase">R$ {p.preco.toFixed(2)} • /{p.slug}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditandoId(p.id); setFormProd({ nome: p.nome, preco: p.preco.toString(), slug: p.slug, descricao: p.descricao || "", features: p.features?.join(", ") || "" }); }} className="p-3 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={20}/></button>
                    <button onClick={() => excluirProduto(p.id, p.nome)} className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {abaAtiva === "compras" && (
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-black mb-2 tracking-tight">Minha Biblioteca (Diretor)</h2>
            <p className="text-slate-400 font-medium mb-12 italic">Acesse suas próprias licenças de teste e uso interno.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {minhasCompras.length > 0 ? (
                minhasCompras.map((pedido) => (
                  pedido.itens?.map((item: any, idx: number) => {
                    const chaveReal = pedido.chave_licenca || "CHAVE-ADMIN-MASTER";
                    return (
                      <div key={`${pedido.id}-${idx}`} className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-blue-500 transition-all duration-300">
                        <div className="p-8 pb-4">
                          <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                            <ShoppingBag size={28} />
                          </div>
                          <h3 className="text-2xl font-black mb-1 tracking-tight text-slate-900">{item.nome}</h3>
                          <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-3 py-1 rounded-full uppercase flex items-center gap-1 border border-blue-100 w-fit">
                            <ShieldCheck size={12} /> Licença Diretor
                          </span>
                        </div>
                        <div className="px-8 py-6 bg-slate-50/80 border-y border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Chave de Ativação</p>
                          <div onClick={() => copiarLicenca(chaveReal)} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors group/key shadow-sm">
                            <code className="text-[11px] font-mono font-black text-blue-600 truncate mr-2">{chaveReal}</code>
                            {copiado === chaveReal ? <CheckCircle2 size={16} className="text-emerald-500 animate-in zoom-in" /> : <Copy size={16} className="text-slate-300 group-hover/key:text-blue-500 transition-colors" />}
                          </div>
                        </div>
                        <div className="p-8 mt-auto">
                          <button className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3">
                            Acessar Software <Zap size={14} fill="currentColor" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-slate-300 font-bold border-2 border-dashed border-slate-100 rounded-[40px]">Nenhuma compra identificada.</div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}