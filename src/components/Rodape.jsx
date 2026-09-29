import { Link } from 'react-router-dom';

export default function Rodape() {
  return (
    <footer className="rodape-root">
      <div className="rodape-grid">
        <div>
          <h3 className="rodape-titulo brand-green-text">Vitrine Alegre</h3>
          <p className="rodape-texto">
            Sua loja virtual completa com a melhor seleção de produtos e entrega rápida para todo o Brasil.
          </p>
        </div>

        <div>
          <h3 className="rodape-titulo">Navegação</h3>
          <ul className="rodape-links">
            <li><Link to="/">Home / Vitrine</Link></li>
            <li><Link to="/carrinho">Carrinho de Compras</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="rodape-titulo">Atendimento</h3>
          <p className="rodape-texto">Segunda a Sexta, das 8h às 18h</p>
          <p className="rodape-texto">contato@vitrinealegre.com.br</p>
        </div>
      </div>

      <div className="rodape-copyright">
        © 2026 Vitrine Alegre. Todos os direitos reservados.
      </div>
    </footer>
  );
}