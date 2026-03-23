import { Terminal, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Coluna 1: Logo e Bio */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-blue-600 mb-4">
              <Terminal size={24} strokeWidth={3} />
              <span className="text-xl font-black tracking-tighter text-slate-900">
                TEXT<span className="text-blue-600">COMMANDER</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              A ferramenta definitiva para desenvolvedores e produtores de conteúdo. 
              Sua produtividade em escala global com tecnologia brasileira.
            </p>
          </div>

          {/* Coluna 2: Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-slate-500 font-medium">
              <li><Link href="/" className="hover:text-blue-600 transition">Softwares</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Atualizações</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Documentação</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-2 italic hover:text-blue-600 cursor-pointer">
                <Mail size={14} /> suporte@textcommander.com
              </li>
              <li><Link href="#" className="hover:text-blue-600 transition">FAQ</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <p>© {anoAtual} TextCommander Store — Todos os direitos reservados.</p>
          <div className="flex gap-6">
             <Github size={18} className="hover:text-slate-900 cursor-pointer transition" />
             <Twitter size={18} className="hover:text-slate-900 cursor-pointer transition" />
          </div>
        </div>
      </div>
    </footer>
  );
}