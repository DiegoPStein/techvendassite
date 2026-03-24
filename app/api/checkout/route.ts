import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cliente, itens, total } = body;

    // 1. Identificação do Usuário
    const { data: { user } } = await supabase.auth.getUser();
    const emailDestino = user?.email || cliente?.email;

    // 2. Gerar Chave de Licença única para o pedido
    const chaveGerada = `TC-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;

    // 3. Salvar na tabela 'pedidos' seguindo sua estrutura real do banco
    const { data, error: erroDb } = await supabase
      .from("pedidos")
      .insert([
        {
          cliente_nome: cliente.nome,
          cliente_email: cliente.email,
          itens: itens,             // Coluna jsonb que recebe o array de produtos
          total: total,             // Coluna double precision
          chave_licenca: chaveGerada, // IMPORTANTE: Rodar o SQL abaixo antes de testar
        }
      ])
      .select();

    if (erroDb) {
      console.error("Erro Supabase:", erroDb.message);
      throw new Error(`Erro Supabase: ${erroDb.message}`);
    }

    // 4. Enviar e-mail com a Chave de Licença
    if (emailDestino && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "TechCorp <onboarding@resend.dev>",
          to: emailDestino,
          subject: "🚀 Sua licença TechCorp chegou!",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #fff; padding: 40px; border: 1px solid #eee; border-radius: 20px;">
              <h1 style="color: #1d4ed8; font-size: 24px;">Olá, ${cliente.nome}!</h1>
              <p style="color: #444; font-size: 16px;">Sua compra foi confirmada. Aqui está sua chave de acesso:</p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 12px; text-align: center; margin: 25px 0; border: 2px dashed #d1d5db;">
                <code style="font-size: 22px; font-weight: bold; color: #111827; letter-spacing: 2px;">${chaveGerada}</code>
              </div>

              <p style="color: #666; font-size: 14px;">Você também pode baixar seus produtos diretamente no seu painel.</p>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" style="display: inline-block; padding: 14px 28px; background: #1d4ed8; color: #fff; text-decoration: none; border-radius: 10px; font-weight: bold; margin-top: 10px;">IR PARA O DASHBOARD</a>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error("Erro ao enviar e-mail:", mailErr);
      }
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("ERRO COMPLETO:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}