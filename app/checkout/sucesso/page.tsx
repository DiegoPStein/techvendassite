"use client";

import Link from "next/link";
import { CheckCircle2, Download, Mail, ArrowRight } from "lucide-react";

export default function SucessoPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 p-4 rounded-full text-green-600 animate-bounce">
            <CheckCircle2 size={48} />
          </div>
        </div>
        
        <h1 className="text-4xl font-black text-slate-900 mb-4">Pedido Confirmado!</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Obrigado por escolher o <strong>TextCommander</strong>. Enviamos os detalhes da sua licença e o link de instalação para o seu e-mail.
        </p>

        <div className="space-y-4">
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <Download size={20} /> Baixar Software Agora
          </button>
          
          <Link href="/" className="flex items-center justify-center gap-2 text-slate-500 font-medium hover:text-slate-800 transition">
            Voltar para a Home <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 text-left">
          <Mail className="text-blue-600 shrink-0" />
          <p className="text-xs text-slate-500">
            Dúvidas sobre a instalação? Responda ao e-mail de confirmação ou acesse nosso suporte.
          </p>
        </div>
      </div>
    </main>
  );
}