"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ShieldCheck, Lock, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importação necessária

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter(); // Inicialização do roteador

  const total = cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  async function handleCheckout() {
    if (!nome || !email) {
      alert("Por favor, preencha seu nome e e-mail para receber a licença.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: { nome, email },
          itens: cart,
          total,
        }),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        router.push("/checkout/sucesso"); // Redireciona após sucesso
      } else {
        alert("Erro ao processar pedido. Tente novamente.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <Link href="/carrinho" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition font-medium">
          <ArrowLeft size={18} /> Voltar ao carrinho
        </Link>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
             <h2 className="text-2xl font-bold text-slate-800">Seu carrinho está vazio</h2>
             <Link href="/" className="text-blue-600 font-bold mt-4 inline-block">Voltar para a loja</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Lado Esquerdo: Formulário */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <Lock size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Dados de Entrega</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    placeholder="Como você quer ser chamado?"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">E-mail de Acesso</label>
                  <input
                    type="email"
                    placeholder="Onde enviaremos sua licença?"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                  />
                  <p className="text-[11px] text-slate-400 mt-2 italic flex items-center gap-1">
                    <ShieldCheck size={12} /> Seus dados estão seguros e criptografados.
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Processando...
                    </>
                  ) : (
                    "Confirmar e Finalizar"
                  )}
                </button>
              </div>
            </div>

            {/* Lado Direito: Resumo */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-blue-400" /> Resumo do Pedido
              </h2>
              
              <div className="space-y-4 mb-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div>
                      <p className="font-bold">{item.nome}</p>
                      <p className="text-xs text-slate-400">Qtd: {item.quantidade}</p>
                    </div>
                    <span className="font-medium text-blue-300">
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Valor Total</p>
                  <p className="text-4xl font-black text-white leading-none">R$ {total.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Acesso Imediato</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}