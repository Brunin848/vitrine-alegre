// import { useState, useEffect } from 'react';
// import CardProduto from '../components/CardProduto';
// import FiltroCategorias from '../components/FiltroCategorias';
// import Paginacao from '../components/Paginacao';
// import Toast from '../components/Toast';
// import { EsqueletoProdutos, ErroRede, BuscaVazia } from '../components/EstadosInterface';
// import { useCarrinho } from '../context/CarrinhoContext';

// export default function Vitrine({ termoBusca }) {
//   const [produtos, setProdutos] = useState([]);
//   const [categorias, setCategorias] = useState([]);
//   const [categoriaAtiva, setCategoriaAtiva] = useState('');
//   const [ordenacao, setOrdenacao] = useState('');
//   const [carregando, setCarregando] = useState(true);
//   const [erro, setErro] = useState(false);
//   const [pagina, setPagina] = useState(1);
//   const [total, setTotal] = useState(0);
  
//   // Requisito 1: Estado para gerenciar o Pop-up/Toast
//   const [toast, setToast] = useState({ visivel: false, mensagem: '' });

//   const { adicionarAoCarrinho } = useCarrinho();
//   const ITENS_POR_PAGINA = 12;

//   const dispararToast = (produto) => {
//     adicionarAoCarrinho(produto, 1);
//     setToast({
//       visivel: true,
//       mensagem: `"${produto.title}" foi adicionado ao carrinho!`,
//     });
//   };

//   useEffect(() => {
//     fetch('https://dummyjson.com/products/category-list')
//       .then((res) => res.json())
//       .then((data) => setCategorias(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const carregarProdutos = () => {
//     setCarregando(true);
//     setErro(false);
//     const skip = (pagina - 1) * ITENS_POR_PAGINA;
//     let url = '';

//     if (termoBusca) {
//       url = `https://dummyjson.com/products/search?q=${encodeURIComponent(termoBusca)}&limit=${ITENS_POR_PAGINA}&skip=${skip}`;
//     } else if (categoriaAtiva) {
//       url = `https://dummyjson.com/products/category/${encodeURIComponent(categoriaAtiva)}?limit=${ITENS_POR_PAGINA}&skip=${skip}`;
//     } else {
//       url = `https://dummyjson.com/products?limit=${ITENS_POR_PAGINA}&skip=${skip}`;
//     }

//     if (ordenacao) {
//       const [sortBy, order] = ordenacao.split('-');
//       url += `&sortBy=${sortBy}&order=${order}`;
//     }

//     fetch(url)
//       .then((res) => {
//         if (!res.ok) throw new Error('Erro na rede');
//         return res.json();
//       })
//       .then((data) => {
//         setProdutos(data.products || []);
//         setTotal(data.total || 0);
//         setCarregando(false);
//       })
//       .catch(() => {
//         setErro(true);
//         setCarregando(false);
//       });
//   };

//   useEffect(() => {
//     carregarProdutos();
//   }, [pagina, categoriaAtiva, termoBusca, ordenacao]);

//   if (erro) return <ErroRede aoRecarregar={carregarProdutos} />;

//   return (
//     <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
//       {/* Pop-up Toast do Requisito 1 */}
//       <Toast
//         mensagem={toast.mensagem}
//         visivel={toast.visivel}
//         aoFechar={() => setToast({ visivel: false, mensagem: '' })}
//       />

//       {/* Requisito 4: Alinhamento e separação responsiva entre categorias e 'Ordenar por' */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
//         <div className="flex-1 min-w-0 overflow-hidden">
//           <FiltroCategorias
//             categorias={categorias}
//             ativa={categoriaAtiva}
//             aoSelecionar={(cat) => {
//               setCategoriaAtiva(cat);
//               setPagina(1);
//             }}
//           />
//         </div>

//         <div className="flex items-center gap-2 text-xs font-semibold shrink-0 self-end md:self-center bg-gray-50 md:bg-transparent p-2 md:p-0 rounded-lg">
//           <label htmlFor="ordenar" className="text-gray-500 whitespace-nowrap">
//             Ordenar por:
//           </label>
//           <select
//             id="ordenar"
//             value={ordenacao}
//             onChange={(e) => setOrdenacao(e.target.value)}
//             className="bg-white border border-gray-200 text-brand-dark py-1.5 px-3 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm text-xs"
//           >
//             <option value="">Relevância</option>
//             <option value="price-asc">Menor Preço</option>
//             <option value="price-desc">Maior Preço</option>
//             <option value="title-asc">Nome (A-Z)</option>
//           </select>
//         </div>
//       </div>

//       {carregando ? (
//         <EsqueletoProdutos quantidade={ITENS_POR_PAGINA} />
//       ) : produtos.length === 0 ? (
//         <BuscaVazia aoLimpar={() => { setCategoriaAtiva(''); setPagina(1); }} />
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {produtos.map((produto) => (
//               <CardProduto
//                 key={produto.id}
//                 produto={produto}
//                 aoAdicionarComToast={dispararToast}
//               />
//             ))}
//           </div>

//           <Paginacao
//             paginaAtual={pagina}
//             totalItens={total}
//             itensPorPagina={ITENS_POR_PAGINA}
//             aoMudarPagina={setPagina}
//           />
//         </>
//       )}
//     </main>
//   );
// }

import { useState, useEffect } from 'react';
import CardProduto from '../components/CardProduto';
import FiltroCategorias from '../components/FiltroCategorias';
import Paginacao from '../components/Paginacao';
import Toast from '../components/Toast';
import { EsqueletoProdutos, ErroRede, BuscaVazia } from '../components/EstadosInterface';
import { useCarrinho } from '../context/CarrinhoContext';

export default function Vitrine({ termoBusca }) {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('');
  const [ordenacao, setOrdenacao] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState({ visivel: false, mensagem: '' });

  const { adicionarAoCarrinho } = useCarrinho();
  const ITENS_POR_PAGINA = 12;

  const dispararToast = (produto) => {
    adicionarAoCarrinho(produto, 1);
    setToast({
      visivel: true,
      mensagem: `"${produto.title}" foi adicionado ao carrinho!`,
    });
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error(err));
  }, []);

  const carregarProdutos = () => {
    setCarregando(true);
    setErro(false);
    const skip = (pagina - 1) * ITENS_POR_PAGINA;
    let url = '';

    if (termoBusca) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(termoBusca)}&limit=${ITENS_POR_PAGINA}&skip=${skip}`;
    } else if (categoriaAtiva) {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(categoriaAtiva)}?limit=${ITENS_POR_PAGINA}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products?limit=${ITENS_POR_PAGINA}&skip=${skip}`;
    }

    if (ordenacao) {
      const [sortBy, order] = ordenacao.split('-');
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Erro na rede');
        return res.json();
      })
      .then((data) => {
        setProdutos(data.products || []);
        setTotal(data.total || 0);
        setCarregando(false);
      })
      .catch(() => {
        setErro(true);
        setCarregando(false);
      });
  };

  useEffect(() => {
    carregarProdutos();
  }, [pagina, categoriaAtiva, termoBusca, ordenacao]);

  if (erro) return <ErroRede aoRecarregar={carregarProdutos} />;

  return (
    <main className="page-wrapper">
      <Toast
        mensagem={toast.mensagem}
        visivel={toast.visivel}
        aoFechar={() => setToast({ visivel: false, mensagem: '' })}
      />

      <div className="barra-filtros">
        <div style={{ flex: 1, minWidth: 0 }}>
          <FiltroCategorias
            categorias={categorias}
            ativa={categoriaAtiva}
            aoSelecionar={(cat) => {
              setCategoriaAtiva(cat);
              setPagina(1);
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label htmlFor="ordenar" style={{ fontSize: 12, color: '#6b7280', fontWeight: 600 }}>
            Ordenar por:
          </label>
          <select
            id="ordenar"
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            className="select-ordenacao"
          >
            <option value="">Relevância</option>
            <option value="price-asc">Menor Preço</option>
            <option value="price-desc">Maior Preço</option>
            <option value="title-asc">Nome (A-Z)</option>
          </select>
        </div>
      </div>

      {carregando ? (
        <EsqueletoProdutos quantidade={ITENS_POR_PAGINA} />
      ) : produtos.length === 0 ? (
        <BuscaVazia aoLimpar={() => { setCategoriaAtiva(''); setPagina(1); }} />
      ) : (
        <>
          <div className="grid-produtos">
            {produtos.map((produto) => (
              <CardProduto
                key={produto.id}
                produto={produto}
                aoAdicionarComToast={dispararToast}
              />
            ))}
          </div>

          <Paginacao
            paginaAtual={pagina}
            totalItens={total}
            itensPorPagina={ITENS_POR_PAGINA}
            aoMudarPagina={setPagina}
          />
        </>
      )}
    </main>
  );
}