import CardProduto from './CardProduto';

export default function ListaProdutos({ produtos, aoAdicionarComToast }) {
  if (!produtos || produtos.length === 0) return null;

  return (
    <div className="grid-produtos">
      {produtos.map((produto) => (
        <CardProduto
          key={produto.id}
          produto={produto}
          aoAdicionarComToast={aoAdicionarComToast}
        />
      ))}
    </div>
  );
}