import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Truck, ShieldCheck, RefreshCw, Minus, Plus, ChevronRight } from 'lucide-react';
import { useCarrinho } from '../context/CarrinhoContext';
import CardProduto from '../components/CardProduto';

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

export default function DetalheProduto({ aoAdicionarComToast }) {
  const { id } = useParams();
  const { adicionarAoCarrinho } = useCarrinho();
  
  const [produto, setProduto] = useState(null);
  const [produtosRelacionados, setProdutosRelacionados] = useState([]);
  const [quantidade, setQuantidade] = useState(1);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduto(data);
        setCarregando(false);
        fetch(`https://dummyjson.com/products/category/${data.category}?limit=4`)
          .then((res) => res.json())
          .then((catData) => {
            setProdutosRelacionados(catData.products.filter((p) => p.id !== data.id));
          });
      })
      .catch(() => setCarregando(false));
  }, [id]);

  if (carregando) {
    return <div className="detalhe-pagina carregando">A carregar produto...</div>;
  }

  if (!produto) {
    return <div className="detalhe-pagina">Produto não encontrado.</div>;
  }

  const tituloTraduzido = MAPA_TITULOS[produto.title] || produto.title;
  const precoComDesconto = produto.price;
  const percentualDesconto = produto.discountPercentage || 0;
  const precoOriginal = (precoComDesconto / (1 - percentualDesconto / 100)).toFixed(2);
  const economia = (precoOriginal - precoComDesconto).toFixed(2);
  const valorParcela = (precoComDesconto / 12).toFixed(2);

  const handleAdicionar = () => {
    for (let i = 0; i < quantidade; i++) {
      adicionarAoCarrinho(produto);
    }
    if (aoAdicionarComToast) {
      aoAdicionarComToast(tituloTraduzido);
    }
  };

  return (
    <div className="detalhe-pagina">
      {/* Breadcrumb */}
      <nav className="breadcrumbs">
        <Link to="/">Início</Link>
        <ChevronRight size={14} />
        <span>{produto.category}</span>
        <ChevronRight size={14} />
        <span className="ativo">{tituloTraduzido}</span>
      </nav>

      {/* Cartão Principal do Produto */}
      <div className="detalhe-card-principal">
        <div className="detalhe-imagem-destaque">
          <img src={produto.thumbnail} alt={tituloTraduzido} />
        </div>

        <div className="detalhe-info">
          <span className="detalhe-categoria-tag">{produto.category}</span>
          <h1 className="detalhe-titulo">{tituloTraduzido}</h1>
          
          <div className="detalhe-subinfo">
            <span>Marca: <strong>{produto.brand || 'Genérica'}</strong></span>
            <span className="divisor">•</span>
            <span>SKU: {produto.sku || `PROD-${produto.id}`}</span>
          </div>

          <div className="detalhe-avaliacao-row">
            <div className="estrelas">
              <Star size={16} fill="#eab308" color="#eab308" />
              <span className="nota">{produto.rating?.toFixed(2)}</span>
            </div>
            <span className="total-avaliacoes">({produto.reviews?.length || 0} avaliações)</span>
          </div>

          <div className="detalhe-preco-box">
            {percentualDesconto > 0 && (
              <div className="linha-preco-antigo">
                <span className="preco-antigo">R$ {precoOriginal}</span>
                <span className="tag-economia">Economize R$ {economia}</span>
              </div>
            )}
            <div className="linha-preco-atual">
              <span className="preco-atual">R$ {precoComDesconto.toFixed(2)}</span>
              {percentualDesconto > 0 && (
                <span className="tag-desconto">-{Math.round(percentualDesconto)}%</span>
              )}
            </div>
            <p className="parcelamento">em até 12x de R$ {valorParcela} sem juros</p>
          </div>

          <div className="detalhe-estoque">
            <span className="ponto-verde"></span>
            <span>{produto.stock} em estoque</span>
          </div>

          {/* Seleção de Quantidade e Botão */}
          <div className="detalhe-acoes">
            <div className="seletor-quantidade">
              <button onClick={() => setQuantidade(Math.max(1, quantidade - 1))}>
                <Minus size={16} />
              </button>
              <span>{quantidade}</span>
              <button onClick={() => setQuantidade(quantidade + 1)}>
                <Plus size={16} />
              </button>
            </div>

            <button onClick={handleAdicionar} className="btn-adicionar-detalhe">
              <ShoppingCart size={18} /> Adicionar ao carrinho
            </button>
          </div>

          {/* Selos de Benefício */}
          <div className="detalhe-beneficios-grid">
            <div className="item-beneficio">
              <Truck size={20} />
              <div>
                <strong>ENVIO</strong>
                <p>{produto.shippingInformation || 'Entrega garantida'}</p>
              </div>
            </div>
            <div className="item-beneficio">
              <ShieldCheck size={20} />
              <div>
                <strong>GARANTIA</strong>
                <p>{produto.warrantyInformation || 'Garantia de fábrica'}</p>
              </div>
            </div>
            <div className="item-beneficio">
              <RefreshCw size={20} />
              <div>
                <strong>DEVOLUÇÃO</strong>
                <p>{produto.returnPolicy || '7 dias para devolução'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Descrição e Especificações */}
      <div className="detalhe-secao-card">
        <h2>Descrição</h2>
        <p className="texto-descricao">{produto.description}</p>
        {produto.tags && (
          <div className="hashtags">
            {produto.tags.map((tag, idx) => (
              <span key={idx}>#{tag}</span>
            ))}
          </div>
        )}

        <hr className="divisor-secao" />

        <h2>Especificações</h2>
        <div className="grid-especificacoes">
          <div className="item-especificacao">
            <span className="rotulo">Peso:</span>
            <span className="valor">{produto.weight || '0.5'} kg</span>
          </div>
          <div className="item-especificacao">
            <span className="rotulo">Dimensões:</span>
            <span className="valor">
              {produto.dimensions 
                ? `${produto.dimensions.width} x ${produto.dimensions.height} x ${produto.dimensions.depth} cm` 
                : '10 x 10 x 10 cm'}
            </span>
          </div>
          <div className="item-especificacao">
            <span className="rotulo">Estoque:</span>
            <span className="valor">{produto.stock} unidades</span>
          </div>
          <div className="item-especificacao">
            <span className="rotulo">Pedido mínimo:</span>
            <span className="valor">{produto.minimumOrderQuantity || 1} unidades</span>
          </div>
        </div>
      </div>

      {/* Avaliações */}
      {produto.reviews && produto.reviews.length > 0 && (
        <div className="detalhe-secao-card">
          <h2>Avaliações ({produto.reviews.length})</h2>
          <div className="lista-avaliacoes">
            {produto.reviews.map((rev, idx) => (
              <div key={idx} className="card-avaliacao-item">
                <div className="avatar-usuario">
                  {rev.reviewerName ? rev.reviewerName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="conteudo-avaliacao">
                  <div className="header-avaliacao">
                    <strong>{rev.reviewerName}</strong>
                    <span className="data-avaliacao">
                      {new Date(rev.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="estrelas-avaliacao">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < rev.rating ? '#eab308' : '#e2e8f0'}
                        color={i < rev.rating ? '#eab308' : '#cbd5e1'}
                      />
                    ))}
                  </div>
                  <p className="comentario-avaliacao">{rev.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Produtos Relacionados */}
      {produtosRelacionados.length > 0 && (
        <div className="secao-relacionados">
          <h2>Produtos Relacionados</h2>
          <div className="grid-produtos">
            {produtosRelacionados.map((item) => (
              <CardProduto
                key={item.id}
                produto={item}
                aoAdicionarComToast={aoAdicionarComToast}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}