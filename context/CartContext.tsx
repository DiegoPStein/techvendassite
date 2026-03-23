"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number; // Qtd total de itens
  cartTotal: number; // Preço total somado
  addToCart: (produto: Omit<CartItem, "quantidade">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantidade: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false); // 🔥 Controle de Hidratação

  // 🔥 Carregar do localStorage apenas após o componente montar
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("cart_softwares");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar carrinho", e);
      }
    }
  }, []);

  // 🔥 Salvar sempre que o cart mudar (apenas se já estiver montado)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart_softwares", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  // Cálculos derivados (Memoizados automaticamente por estarem no render)
  const cartCount = cart.reduce((acc, item) => acc + item.quantidade, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  function addToCart(produto: Omit<CartItem, "quantidade">) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === produto.id);
      if (existing) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id: string, quantidade: number) {
    if (quantidade <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantidade } : item))
    );
  }

  function clearCart() {
    setCart([]);
  }

  // Se não estiver montado, podemos retornar um estado vazio ou null 
  // para evitar erro de hidratação no servidor
  if (!isMounted) return null; 

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa estar dentro de CartProvider");
  return context;
}