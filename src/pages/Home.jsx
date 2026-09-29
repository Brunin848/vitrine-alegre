import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CardProduto from '../components/CardProduto';

export default function Home({ aoMostrarToast, termoBusca }) {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('todas');
  const [ordenacao, setOrdenacao] = useState('relevancia');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const limite = 12;

  // Reinicia para a página 1 ao pesquisar, trocar categoria ou mudar ordenação
  useEffect(() => {
    setPaginaAtual(1);
  }, [termoBusca, categoriaAtiva, ordenacao]);

  // Carrega lista de categorias com validação de tipo
  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategorias(data);
        } else {
          setCategorias([]);
        }
      })
      .catch(() => setCategorias([]));
  }, []);

  // Carrega produtos com tratamento de erros robusto
  useEffect(() => {
    setCarregando(true);
    const skip = (paginaAtual - 1) * limite;

    let url = '';
    const paramsBase = `limit=${limite}&skip=${skip}`;

    if (termoBusca && termoBusca.trim() !== '') {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(termoBusca)}&${paramsBase}`;
    } else if (categoriaAtiva !== 'todas') {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(categoriaAtiva)}?${paramsBase}`;
    } else {
      url = `https://dummyjson.com/products?${paramsBase}`;
      if (ordenacao === 'preco-asc') url += '&sortBy=price&order=asc';
      if (ordenacao === 'preco-desc') url += '&sortBy=price&order=desc';
      if (ordenacao === 'nome-asc') url += '&sortBy=title&order=asc';
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erro na resposta da API');
        return res.json();
      })
      .then((data) => {
        let lista = Array.isArray(data.products) ? data.products : [];

        // Ordenação local caso seja busca ou categoria específica
        if (categoriaAtiva !== 'todas' || (termoBusca && termoBusca.trim() !== '')) {
          if (ordenacao === 'preco-asc') lista.sort((a, b) => (a.price || 0) - (b.price || 0));
          if (ordenacao === 'preco-desc') lista.sort((a, b) => (b.price || 0) - (a.price || 0));
          if (ordenacao === 'nome-asc') lista.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        }

        setProdutos(lista);
        setTotalProdutos(data.total || lista.length);
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar produtos:', err);
        setProdutos([]);
        setTotalProdutos(0);
        setCarregando(false);
      });
  }, [paginaAtual, categoriaAtiva, termoBusca, ordenacao]);

  const totalPaginas = Math.ceil((totalProdutos || 0) / limite);

  // Tratadores seguros para exibição de categorias sem quebrar o React
  const formatarNomeCategoria = (cat) => {
    if (typeof cat === 'string') return cat.replace(/-/g, ' ');
    if (typeof cat === 'object' && cat !== null) return cat.name || cat.slug || 'Categoria';
    return String(cat || '');
  };

  const obterSlugCategoria = (cat) => {
    if (typeof cat === 'string') return cat;
    if (typeof cat === 'object' && cat !== null) return cat.slug || cat.name || '';
    return String(cat || '');
  };

  const renderPaginacao = () => {
    if (totalPaginas <= 1) return null;

    let inicio = Math.max(1, paginaAtual - 1);
    let fim = Math.min(totalPaginas, paginaAtual + 2);

    if (paginaAtual <= 3) {
      inicio = 1;
      fim = Math.min(4, totalPaginas);
    } else if (paginaAtual >= totalPaginas - 2) {
      inicio = Math.max(1, totalPaginas - 3);
      fim = totalPaginas;
    }

    const paginas = [];
    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }

    return (
      <div className="paginacao-container">
        <button
          className="btn-paginacao"
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
        >
          <ChevronLeft size={16} />
        </button>

        {inicio > 1 && (
          <>
            <button
              className={`btn-paginacao ${paginaAtual === 1 ? 'ativo' : ''}`}
              onClick={() => setPaginaAtual(1)}
            >
              1
            </button>
            {inicio > 2 && <span className="paginacao-reticencias">...</span>}
          </>
        )}

        {paginas.map((num) => (
          <button
            key={num}
            className={`btn-paginacao ${paginaAtual === num ? 'ativo' : ''}`}
            onClick={() => setPaginaAtual(num)}
          >
            {num}
          </button>
        ))}

        {fim < totalPaginas && (
          <>
            {fim < totalPaginas - 1 && <span className="paginacao-reticencias">...</span>}
            <button
              className={`btn-paginacao ${paginaAtual === totalPaginas ? 'ativo' : ''}`}
              onClick={() => setPaginaAtual(totalPaginas)}
            >
              {totalPaginas}
            </button>
          </>
        )}

        <button
          className="btn-paginacao"
          disabled={paginaAtual === totalPaginas}
          onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <main className="vitrine-container">
      {/* Barra de Filtros */}
      <div className="filtros-bar">
        <div className="categorias-scroll">
          <button
            className={`btn-categoria ${categoriaAtiva === 'todas' ? 'ativa' : 'inativa'}`}
            onClick={() => setCategoriaAtiva('todas')}
          >
            Todas
          </button>
          {Array.isArray(categorias) &&
            categorias.map((cat, idx) => {
              const slug = obterSlugCategoria(cat);
              const nome = formatarNomeCategoria(cat);
              return (
                <button
                  key={slug || idx}
                  className={`btn-categoria ${categoriaAtiva === slug ? 'ativa' : 'inativa'}`}
                  onClick={() => setCategoriaAtiva(slug)}
                >
                  {nome}
                </button>
              );
            })}
        </div>

        <div className="ordenar-box">
          <label htmlFor="ordenar">Ordenar por:</label>
          <select
            id="ordenar"
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            className="select-ordenar"
          >
            <option value="relevancia">Relevância</option>
            <option value="preco-asc">Menor Preço</option>
            <option value="preco-desc">Maior Preço</option>
            <option value="nome-asc">Nome (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Resumo */}
      {!carregando && totalProdutos > 0 && (
        <div className="resumo-produtos-info">
          {totalProdutos} produtos • página {paginaAtual} de {totalPaginas || 1}
        </div>
      )}

      {/* Grid de Produtos */}
      {carregando ? (
        <div className="carregando-grid">A carregar produtos...</div>
      ) : produtos.length === 0 ? (
        <div className="sem-produtos">Nenhum produto encontrado.</div>
      ) : (
        <>
          <div className="grid-produtos">
            {produtos.map((produto) => (
              <CardProduto
                key={produto.id}
                produto={produto}
                aoAdicionarComToast={aoMostrarToast}
              />
            ))}
          </div>

          {renderPaginacao()}
        </>
      )}
    </main>
  );
}