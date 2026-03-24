"use client";

import { X, LockKeyhole, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* OVERLAY COM BLUR */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* MODAL */}
      <div className="relative bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl shadow-blue-900/20 border border-slate-100 animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
            <LockKeyhole size={32} strokeWidth={2.5} />
          </div>

          <h2 className="text-3xl font-black tracking-tighter text-slate-900 mb-4">
            Acesso <span className="text-blue-600 font-italic italic">Restrito</span>
          </h2>
          
          <p className="text-slate-500 font-medium leading-relaxed mb-8 italic">
            Para garantir a entrega da sua licença e segurança dos seus dados, você precisa estar logado na sua conta <span className="font-bold text-slate-900">TechCorp</span>.
          </p>

          <div className="w-full space-y-3">
            <Link 
              href="/login"
              className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-blue-200"
            >
              Fazer Login Agora <ArrowRight size={16} />
            </Link>
            
            <button 
              onClick={onClose}
              className="w-full py-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
            >
              Continuar Navegando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}