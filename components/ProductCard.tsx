export default function ProductCard({ nome, preco }: any) {
  return (
    <div className="border p-5 rounded-xl shadow-sm hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{nome}</h3>
      <p className="text-gray-600 mt-2">R$ {preco}</p>

      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full">
        Comprar
      </button>
    </div>
  );
}