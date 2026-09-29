import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, X, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCarrinho } from '../context/CarrinhoContext';
import '../App.css';

// Função para formatar valores no padrão brasileiro (R$ 1.234,56)
const formatarMoeda = (valor) => {
  return Number(valor || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function Carrinho() {
  const { carrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho } = useCarrinho();
  const [compraConcluida, setCompraConcluida] = useState(false);

  const handleFinalizarCompra = () => {
    limparCarrinho();
    setCompraConcluida(true);
  };

  // Tela de Sucesso
  if (compraConcluida) {
    return (
      <main className="carrinho-pagina-wrapper">
        <div className="carrinho-card-status">
          <div className="carrinho-status-icone sucesso">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="carrinho-status-titulo">Compra Finalizada com Sucesso!</h2>
          <p className="carrinho-status-subtitulo">
            Seu pedido foi processado. Você receberá a confirmação em seu e-mail.
          </p>
          <Link to="/" className="btn-finalizar-pedido link-btn">
            Voltar à Página Inicial
          </Link>
        </div>
      </main>
    );
  }

  // Tela de Carrinho Vazio
  if (!carrinho || carrinho.length === 0) {
    return (
      <main className="carrinho-pagina-wrapper">
        <div className="carrinho-card-status">
          <div className="carrinho-status-icone info">
            <ShoppingBag size={40} />
          </div>
          <h3 className="carrinho-status-titulo">O seu carrinho está vazio</h3>
          <p className="carrinho-status-subtitulo">Escolha um produto na vitrine para começar.</p>
          <Link to="/" className="btn-continuar-link">
            Continuar comprando ›
          </Link>
        </div>
      </main>
    );
  }

  const totalProdutos = carrinho.length;
  const totalUnidades = carrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);

  const subtotal = carrinho.reduce((acc, item) => {
    const preco = Number(item.price) || 0;
    const qtd = Number(item.quantidade) || 1;
    return acc + preco * qtd;
  }, 0);

  const valorParcela = subtotal / 12;

  return (
    <main className="carrinho-pagina-wrapper">
      {/* Cabeçalho do Carrinho */}
      <div className="carrinho-header-top">
        <div className="carrinho-titulo-grupo">
          <h1 className="carrinho-main-title">Seu carrinho</h1>
          <span className="carrinho-contagem-sub">
            {totalProdutos} {totalProdutos === 1 ? 'produto' : 'produtos'} · {totalUnidades} {totalUnidades === 1 ? 'unidade' : 'unidades'}
          </span>
        </div>
        <Link to="/" className="btn-continuar-link">
          Continuar comprando ›
        </Link>
      </div>

      {/* Grid Principal */}
      <div className="carrinho-grid-layout">
        {/* Coluna Esquerda: Lista Única em Card Branco */}
        <div className="carrinho-card-lista">
          {carrinho.map((item, index) => {
            const qtd = item.quantidade || 1;
            const precoUnitario = Number(item.price || 0);
            const precoSubtotalItem = precoUnitario * qtd;

            return (
              <div
                key={item.id}
                className={`carrinho-item-row ${index < carrinho.length - 1 ? 'com-divisor' : ''}`}
              >
                <div className="carrinho-item-thumb-box">
                  <img
                    src={item.thumbnail || item.images?.[0]}
                    alt={item.title}
                    className="carrinho-item-img"
                  />
                </div>

                <div className="carrinho-item-meta">
                  {item.category && (
                    <span className="carrinho-item-categoria">
                      {item.category.toUpperCase()}
                    </span>
                  )}
                  <h3 className="carrinho-item-nome">{item.title}</h3>
                  <span className="carrinho-item-cada">
                    R$ {formatarMoeda(precoUnitario)} cada
                  </span>
                </div>

                <div className="carrinho-qtd-control">
                  <button
                    onClick={() => atualizarQuantidade(item.id, qtd - 1)}
                    className="btn-qtd-action"
                    disabled={qtd <= 1}
                    type="button"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qtd-val">{qtd}</span>
                  <button
                    onClick={() => atualizarQuantidade(item.id, qtd + 1)}
                    className="btn-qtd-action"
                    type="button"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="carrinho-item-valor-total">
                  R$ {formatarMoeda(precoSubtotalItem)}
                </div>

                <button
                  onClick={() => removerDoCarrinho(item.id)}
                  className="btn-remover-x"
                  title="Remover produto"
                  type="button"
                >
                  <X size={18} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Coluna Direita: Resumo do Pedido */}
        <aside className="carrinho-card-resumo">
          <h2 className="resumo-main-title">Resumo do pedido</h2>

          <div className="resumo-row">
            <span>Subtotal ({totalUnidades} {totalUnidades === 1 ? 'item' : 'itens'})</span>
            <span>R$ {formatarMoeda(subtotal)}</span>
          </div>

          <div className="resumo-row">
            <span>Frete</span>
            <span className="frete-gratis-text">Grátis</span>
          </div>

          <div className="resumo-divider" />

          <div className="resumo-row-total">
            <span className="total-label">Total</span>
            <div className="total-valor-wrapper">
              <span className="total-val-destaque">R$ {formatarMoeda(subtotal)}</span>
              <span className="total-parcelamento">
                em 12x de R$ {formatarMoeda(valorParcela)}
              </span>
            </div>
          </div>

          <button onClick={handleFinalizarCompra} className="btn-finalizar-pedido" type="button">
            Finalizar compra
          </button>
        </aside>
      </div>
    </main>
  );
}