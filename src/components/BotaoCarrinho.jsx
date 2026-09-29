// import { ShoppingCart } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function BotaoCarrinho({ quantidade }) {
//   return (
//     <Link
//       to="/carrinho"
//       className="flex items-center gap-2 bg-[#2a305e] hover:bg-[#343b73] text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
//     >
//       <div className="relative">
//         <ShoppingCart className="w-5 h-5" />
//         {quantidade > 0 && (
//           <span className="absolute -top-2 -right-2 bg-brand-green text-brand-dark text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
//             {quantidade}
//           </span>
//         )}
//       </div>
//       <span>Carrinho</span>
//     </Link>
//   );
// }

import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BotaoCarrinho({ quantidade }) {
  return (
    <Link to="/carrinho" className="btn-carrinho-header">
      <div style={{ position: 'relative' }}>
        <ShoppingCart style={{ width: 20, height: 20 }} />
        {quantidade > 0 && (
          <span className="carrinho-badge">{quantidade}</span>
        )}
      </div>
      <span>Carrinho</span>
    </Link>
  );
}