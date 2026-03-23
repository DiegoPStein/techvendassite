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

    // 1. SALVAR NO SUPABASE
    const { error: dbError } = await supabase
      .from("pedidos")
      .insert([
        {
          cliente_nome: body.cliente.nome,
          cliente_email: body.cliente.email,
          itens: body.itens,
          total: body.total,
        },
      ]);

    if (dbError) throw new Error("Erro ao salvar no banco");

    // 2. ENVIAR E-MAIL DE ENTREGA
    // Nota: No plano grátis do Resend sem domínio próprio, 
    // você só consegue enviar para o seu PRÓPRIO e-mail de cadastro.
    await resend.emails.send({
      from: "TextCommander <onboarding@resend.dev>",
      to: body.cliente.email, // Quando tiver domínio próprio, envia pra qualquer um
      subject: "🚀 Sua licença do TextCommander chegou!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 40px; border-radius: 20px;">
          <h1 style="color: #1d4ed8; font-size: 24px;">Olá, ${body.cliente.nome}!</h1>
          <p style="color: #4b5563; font-size: 16px;">Obrigado por adquirir o <b>TextCommander</b>. Sua licença foi confirmada com sucesso!</p>
          
          <div style="background: #ffffff; padding: 20px; border-radius: 15px; margin: 20px 0; border: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; font-weight: bold;">Seu link de download:</p>
            <a href="https://seu-link-de-download.com/setup.exe" style="display: inline-block; margin-top: 10px; padding: 12px 24px; background: #1d4ed8; color: #fff; text-decoration: none; border-radius: 10px; font-weight: bold;">BAIXAR AGORA</a>
          </div>

          <p style="color: #9ca3af; font-size: 12px;">Pedido: ${Math.random().toString(36).toUpperCase().substring(2, 10)}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Erro completo:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}