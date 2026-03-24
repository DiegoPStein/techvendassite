"use client";

import { Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-24 bg-slate-950 text-white border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 relative z-10">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <Cpu size={24} />
            </div>
            <span className="text-3xl font-black tracking-tighter uppercase">
              Tech<span className="text-blue-500">Corp</span>
            </span>
          </div>
          <p className="text-slate-400 max-w-sm font-medium leading-relaxed italic">
            Liderando a revolução digital através de sistemas de alta precisão e interfaces intuitivas para o mercado brasileiro.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 md:justify-end">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 text-right md:text-left">Ecossistema</h4>
            <ul className="text-sm text-slate-400 space-y-2 font-bold uppercase tracking-widest text-right md:text-left">
              <li className="hover:text-white cursor-pointer transition-colors">Soluções</li>
              <li className="hover:text-white cursor-pointer transition-colors">Documentação</li>
              <li className="hover:text-white cursor-pointer transition-colors">Suporte Técnico</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-900 text-center opacity-50">
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.6em]">
          © 2026 TechCorp • Engineered for Excellence
        </p>
      </div>
    </footer>
  );
}