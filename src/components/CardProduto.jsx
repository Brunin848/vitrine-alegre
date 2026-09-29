import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { useCarrinho } from '../context/CarrinhoContext';

const MAPA_TITULOS = {
  'Essence Mascara Lash Princess': 'Máscara de Cílios Essence Lash Princess',
  'Eyeshadow Palette with Mirror': 'Paleta de Sombras com Espelho',
  'Powder Canister': 'Pó Facial Compacto',
  'Red Lipstick': 'Batom Vermelho',
  'Red Nail Polish': 'Esmalte Vermelho',
  'Calvin Klein CK One': 'Perfume Calvin Klein CK One',
  'Chanel Coco Noir Eau De Parfum': 'Perfume Chanel Coco Noir Eau De Parfum',
  "Dior J'adore": "Perfume Dior J'adore",
};

export default function CardProduto({ produto, aoAdicionarComToast }) {
  const { carrinho, adicionarAoCarrinho } = useCarrinho();

  const tituloTraduzido = MAPA_TITULOS[produto?.title] || produto?.title || '';
  const itemNoCarrinho = (carrinho || []).find((item) => item.id === produto?.id);
  const qtdNoCarrinho = itemNoCarrinho ? itemNoCarrinho.quantidade || 1 : 0;

  const precoEconomia = produto?.discountPercentage
    ? ((produto.price * produto.discountPercentage) / 100).toFixed(2)
    : null;
  const precoAntigo = produto?.discountPercentage
    ? (produto.price + Number(precoEconomia)).toFixed(2)
    : null;

  const handleAdicionar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (produto) {
      adicionarAoCarrinho(produto);
      if (aoAdicionarComToast) {
        aoAdicionarComToast(tituloTraduzido);
      }
    }
  };

  return (
    <div className="card-produto">
      <Link to={`/produto/${produto?.id}`} className="card-link-wrapper">
        <div className="card-img-wrapper">
          {qtdNoCarrinho > 0 && (
            <div className="badge-no-carrinho">
              <Check size={12} /> No carrinho ({qtdNoCarrinho})
            </div>
          )}
          <img src={produto?.thumbnail} alt={tituloTraduzido} className="card-img" />
        </div>

        <h3 className="card-titulo">{tituloTraduzido}</h3>
        <p className="card-descricao">{produto?.description}</p>

        <div className="card-avaliacao">
          <Star size={14} fill="#eab308" color="#eab308" />
          <span>{produto?.rating?.toFixed(1)}</span>
        </div>

        <div className="card-preco-box">
          <span className="card-preco">R$ {produto?.price?.toFixed(2)}</span>
          {precoAntigo && <span className="card-preco-antigo">R$ {precoAntigo}</span>}
        </div>
      </Link>

      <button onClick={handleAdicionar} className="btn-adicionar">
        <ShoppingCart size={16} /> Adicionar
      </button>
    </div>
  );
}