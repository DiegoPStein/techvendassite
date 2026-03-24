import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import { createClient } from "@supabase/supabase-js";

// 1. Conexão com Supabase (Versão Server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Produto({ params }: Props) {
  const { slug } = await params;

  // 2. Busca o produto direto no banco de dados usando o SLUG da URL
  const { data: produto, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("slug", slug)
    .single(); // .single() garante que pegamos apenas UM objeto e não uma lista

  // 3. Se deu erro ou o produto não existe no banco, mostra a página 404
  if (error || !produto) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#FDFDFF]">
      {/* 4. Passamos o produto do banco para o seu componente visual */}
      <ProductView produto={produto} />
    </main>
  );
}