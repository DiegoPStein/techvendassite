import Link from "next/link";
import { ShoppingCart, ArrowRight, ShieldCheck, Zap, Terminal } from "lucide-react";

// Agora usando os seus produtos reais
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
    descricao: 'Potência máxima com IA avançada para comandos complexos e fluxos de trabalho.' 
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* --- HERO SECTION --- */}
      <section className="px-6 py-20 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 italic">
          Text<span className="text-blue-600">Commander</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Domine seus textos com comandos inteligentes. A ferramenta definitiva para quem busca velocidade e precisão.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#produtos" className="bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition shadow-lg">
            Ver Versões
          </a>
          <button className="border border-slate-200 px-8 py-3 rounded-full font-medium hover:bg-slate-50 transition">
            Documentação
          </button>
        </div>
      </section>

      {/* --- DIFERENCIAIS --- */}
      <section className="bg-slate-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 text-center bg-white rounded-2xl shadow-sm">
            <Zap className="text-blue-600 mb-4" size={32} />
            <h3 className="font-bold mb-2 text-slate-800">Alta Velocidade</h3>
            <p className="text-sm text-slate-500">Processamento instantâneo de comandos sem delay.</p>
          </div>
          <div className="flex flex-col items-center p-6 text-center bg-white rounded-2xl shadow-sm">
            <ShieldCheck className="text-blue-600 mb-4" size={32} />
            <h3 className="font-bold mb-2 text-slate-800">Segurança Total</h3>
            <p className="text-sm text-slate-500">Seus dados de texto nunca saem do seu ambiente local.</p>
          </div>
          <div className="flex flex-col items-center p-6 text-center bg-white rounded-2xl shadow-sm">
            <Terminal className="text-blue-600 mb-4" size={32} />
            <h3 className="font-bold mb-2 text-slate-800">Interface Clean</h3>
            <p className="text-sm text-slate-500">Feito por desenvolvedores para desenvolvedores.</p>
          </div>
        </div>
      </section>

      {/* --- PRODUTOS --- */}
      <section id="produtos" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Escolha sua versão</h2>
        
        {/* Ajustado para 2 colunas para os seus 2 produtos ficarem harmônicos */}
        <div className="grid md:grid-cols-2 gap-8">
          {produtos.map((prod) => (
            <div key={prod.id} className="group border border-slate-100 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-100 transition-all duration-300 bg-white flex flex-col">
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ArrowRight size={20} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-900">{prod.nome}</h3>
              <p className="text-slate-500 text-sm mb-8 flex-grow leading-relaxed">
                {prod.descricao}
              </p>
              <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">A partir de</span>
                  <span className="text-2xl font-black text-slate-900">R$ {prod.preco.toFixed(2)}</span>
                </div>
                <Link 
                  href={`/produto/${prod.slug}`}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2"
                >
                  Ver Mais
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}