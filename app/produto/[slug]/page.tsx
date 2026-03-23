import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";

type Produto = {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
};

type ProdutoSlug = "textcommander-lite" | "textcommander-pro";

const produtos: Record<ProdutoSlug, Produto> = {
  "textcommander-lite": {
    id: "textcommander-lite",
    nome: "TextCommander Lite",
    preco: 19.9,
    descricao: "Sistema inteligente..."
  },
  "textcommander-pro": {
    id: "textcommander-pro",
    nome: "TextCommander Pro",
    preco: 39.9,
    descricao: "Sistema com IA..."
  }
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Produto({ params }: Props) {
  const { slug } = await params;

  if (!(slug in produtos)) {
    return notFound();
  }

  const produto = produtos[slug as ProdutoSlug];

  return (
    <main className="p-10">
      <ProductView produto={produto} />
    </main>
  );
}