import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cabecalho from './components/Cabecalho';
import Home from './pages/Home';
import DetalheProduto from './pages/DetalheProduto';
import Carrinho from './pages/Carrinho';

export default function App() {
  const [termoBusca, setTermoBusca] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // 1. Inicializa o carrinho com leitura segura do localStorage
  const [carrinho, setCarrinho] = useState(() => {
    try {
      const salvo = localStorage.getItem('carrinho_produtos');
      if (salvo && salvo !== 'undefined') {
        const parsed = JSON.parse(salvo);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch (e) {
      console.error('Erro ao carregar do localStorage:', e);
    }
    return [];
  });

  // 2. Persiste as alterações do carrinho no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('carrinho_produtos', JSON.stringify(carrinho));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  }, [carrinho]);

  const aoMostrarToast = (nomeProduto) => {
    setToastMessage(`"${nomeProduto}" foi adicionado ao carrinho!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Funções de manipulação do carrinho
  const adicionarAoCarrinho = (produto) => {
    if (!produto || !produto.id) return;

    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: (item.quantidade || 1) + 1 }
            : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });

    aoMostrarToast(produto.title || produto.nome || 'Produto');
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  const atualizarQuantidade = (id, novaQtd) => {
    if (novaQtd <= 0) {
      removerDoCarrinho(id);
      return;
    }
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantidade: novaQtd } : item
      )
    );
  };

  return (
    <div className="app-layout">
      <Cabecalho
        termoBusca={termoBusca}
        setTermoBusca={setTermoBusca}
        carrinho={carrinho}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              aoMostrarToast={adicionarAoCarrinho}
              termoBusca={termoBusca}
            />
          }
        />
        <Route
          path="/produto/:id"
          element={
            <DetalheProduto aoAdicionarComToast={adicionarAoCarrinho} />
          }
        />
        <Route
          path="/carrinho"
          element={
            <Carrinho
              carrinho={carrinho}
              setCarrinho={setCarrinho}
              aoRemoverProduto={removerDoCarrinho}
              aoAtualizarQuantidade={atualizarQuantidade}
            />
          }
        />
      </Routes>

      {toastMessage && (
        <div className="toast-notificacao">
          <span>✓ {toastMessage}</span>
          <button onClick={() => setToastMessage('')}>✕</button>
        </div>
      )}
    </div>
  );
}