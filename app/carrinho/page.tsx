"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CarrinhoPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const total = cart.reduce((acc, item) => {
    return acc + item.preco * item.quantidade;
  }, 0);

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabeçalho do Carrinho */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <ShoppingBag className="text-blue-600" /> Meu Carrinho
          </h1>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1 transition">
            <ArrowLeft size={16} /> Continuar comprando
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-sm">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-slate-300" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Seu carrinho está vazio</h2>
            <p className="text-slate-500 mb-8">Parece que você ainda não escolheu seu software.</p>
            <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Lista de Itens */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center justify-between group hover:border-blue-100 transition">
                  <div className="flex flex-col">
                    <h3 className="font-bold text-slate-900 text-lg">{item.nome}</h3>
                    <p className="text-blue-600 font-bold">R$ {item.preco.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Controles de Quantidade */}
                    <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                        className="p-2 hover:bg-white hover:text-blue-600 rounded-lg transition text-slate-400"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold text-slate-700">{item.quantidade}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                        className="p-2 hover:bg-white hover:text-blue-600 rounded-lg transition text-slate-400"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Botão Remover */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition"
                      title="Remover item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo do Pedido */}
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm h-fit sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Resumo</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Taxas</span>
                  <span className="text-green-500 font-medium">Grátis</span>
                </div>
                <div className="h-px bg-slate-50 w-full" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-black text-blue-600">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => router.push("/checkout")}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-slate-100 active:scale-95"
              >
                Finalizar Compra
              </button>
              
              <p className="text-[10px] text-slate-400 text-center mt-4 uppercase font-bold tracking-widest">
                Pagamento 100% Seguro
              </p>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}