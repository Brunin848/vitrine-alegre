import { Link } from 'react-router-dom';
import { ShoppingCart, Search } from 'lucide-react';
import { useCarrinho } from '../context/CarrinhoContext';

export default function Cabecalho({ termoBusca = '', setTermoBusca }) {
  const { carrinho } = useCarrinho();
  const totalItens = (carrinho || []).reduce((acc, item) => acc + (item.quantidade || 1), 0);

  return (
    <header className="cabecalho">
      <div className="cabecalho-container">
        <Link to="/" className="logo-link">
          <div className="logo-box">
            <span className="logo-v">V</span>
            <span className="logo-texto">Vitrine <strong>Alegre</strong></span>
          </div>
        </Link>

        <div className="busca-box">
          <Search size={18} className="icone-busca" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={termoBusca}
            onChange={(e) => setTermoBusca && setTermoBusca(e.target.value)}
            className="input-busca"
          />
        </div>

        <div className="acoes-header">
          <button className="btn-entrar">Entrar</button>
          <Link to="/carrinho" className="btn-carrinho-header">
            <div className="carrinho-icone-wrapper">
              <ShoppingCart size={18} />
              {totalItens > 0 && <span className="badge-contador">{totalItens}</span>}
            </div>
            <span>Carrinho</span>
          </Link>
        </div>
      </div>
    </header>
  );
}