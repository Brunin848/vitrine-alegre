import { AlertTriangle, Search, ShoppingBag, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EsqueletoProdutos({ quantidade = 8 }) {
  return (
    <div className="grid-produtos">
      {Array.from({ length: quantidade }).map((_, index) => (
        <div key={index} className="card-produto esqueleto-card">
          <div className="esqueleto-img"></div>
          <div className="esqueleto-linha w-30"></div>
          <div className="esqueleto-linha w-70"></div>
          <div className="esqueleto-linha w-50"></div>
        </div>
      ))}
    </div>
  );
}

export function ErroRede({ aoRecarregar }) {
  return (
    <div className="estado-box">
      <div className="icone-estado-wrapper erro">
        <AlertTriangle size={24} />
      </div>
      <h3 className="estado-titulo">Não foi possível carregar os produtos</h3>
      <p className="estado-subtitulo">Verifique a sua ligação e tente novamente.</p>
      <button onClick={aoRecarregar} className="btn-adicionar">
        <RefreshCw size={16} /> Tentar novamente
      </button>
    </div>
  );
}

export function BuscaVazia({ aoLimpar }) {
  return (
    <div className="estado-box">
      <div className="icone-estado-wrapper info">
        <Search size={24} />
      </div>
      <h3 className="estado-titulo">Nenhum produto encontrado</h3>
      <p className="estado-subtitulo">Tente outro termo ou limpe os filtros.</p>
      <button onClick={aoLimpar} className="btn-secundario">
        Limpar busca
      </button>
    </div>
  );
}

export function CarrinhoVazio() {
  return (
    <div className="estado-box">
      <div className="icone-estado-wrapper info">
        <ShoppingBag size={24} />
      </div>
      <h3 className="estado-titulo">O seu carrinho está vazio</h3>
      <p className="estado-subtitulo">Escolha um produto na vitrine para começar.</p>
      <Link to="/" className="btn-adicionar link-btn">
        Ir para a vitrine
      </Link>
    </div>
  );
}