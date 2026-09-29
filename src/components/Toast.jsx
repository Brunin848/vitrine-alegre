import { Check, X } from 'lucide-react';

export default function Toast({ mensagem, aoFechar }) {
  if (!mensagem) return null;

  return (
    <div className="toast-container">
      <div className="toast-conteudo">
        <div className="toast-icone-check">
          <Check size={14} />
        </div>
        <span>"{mensagem}" foi adicionado ao carrinho!</span>
        <button onClick={aoFechar} className="btn-fechar-toast">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}