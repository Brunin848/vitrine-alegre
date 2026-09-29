import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Paginacao({ paginaAtual, totalItens, itensPorPagina, aoMudarPagina }) {
  const totalPaginas = Math.ceil(totalItens / itensPorPagina);
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <div className="paginacao-container">
      <button
        disabled={paginaAtual === 1}
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        className="paginacao-btn"
        aria-label="Página anterior"
      >
        <ChevronLeft size={16} />
      </button>

      {paginas.map((num) => (
        <button
          key={num}
          onClick={() => aoMudarPagina(num)}
          className={`paginacao-btn ${paginaAtual === num ? 'ativo' : ''}`}
        >
          {num}
        </button>
      ))}

      <button
        disabled={paginaAtual === totalPaginas}
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        className="paginacao-btn"
        aria-label="Próxima página"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}