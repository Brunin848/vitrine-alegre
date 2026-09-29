import { createContext, useContext, useState, useEffect } from 'react';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState(() => {
    try {
      const localData = localStorage.getItem('carrinho_vitrine');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('carrinho_vitrine', JSON.stringify(carrinho));
    } catch (e) {
      console.error(e);
    }
  }, [carrinho]);

  const adicionarAoCarrinho = (produto, quantidadeAdicionada = 1) => {
    setCarrinho((prev) => {
      const arraySeguro = Array.isArray(prev) ? prev : [];
      const existe = arraySeguro.find((item) => item.id === produto.id);
      if (existe) {
        return arraySeguro.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidadeAdicionada }
            : item
        );
      }
      return [...arraySeguro, { ...produto, quantidade: quantidadeAdicionada }];
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => (Array.isArray(prev) ? prev.filter((item) => item.id !== id) : []));
  };

  const atualizarQuantidade = (id, quantidade) => {
    if (quantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }
    setCarrinho((prev) =>
      Array.isArray(prev)
        ? prev.map((item) => (item.id === id ? { ...item, quantidade } : item))
        : []
    );
  };

  const limparCarrinho = () => setCarrinho([]);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho: Array.isArray(carrinho) ? carrinho : [],
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    return {
      carrinho: [],
      adicionarAoCarrinho: () => {},
      removerDoCarrinho: () => {},
      atualizarQuantidade: () => {},
      limparCarrinho: () => {},
    };
  }
  return context;
}