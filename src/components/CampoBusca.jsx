// import { useState, useEffect } from 'react';
// import { Search } from 'lucide-react';

// export default function CampoBusca({ valorInicial = '', aoBuscar }) {
//   const [termo, setTermo] = useState(valorInicial);

//   // Debounce de 400ms para evitar requisições excessivas enquanto digita
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       aoBuscar(termo);
//     }, 400);

//     return () => clearTimeout(timer);
//   }, [termo, aoBuscar]);

//   return (
//     <div className="relative w-full max-w-md">
//       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//       <input
//         type="text"
//         value={termo}
//         onChange={(e) => setTermo(e.target.value)}
//         placeholder="Buscar produtos..."
//         className="w-full pl-9 pr-4 py-2 text-sm bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"
//       />
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function CampoBusca({ valorInicial = '', aoBuscar }) {
  const [termo, setTermo] = useState(valorInicial);

  useEffect(() => {
    const timer = setTimeout(() => {
      aoBuscar(termo);
    }, 400);

    return () => clearTimeout(timer);
  }, [termo, aoBuscar]);

  return (
    <div className="busca-input-container">
      <Search className="busca-icone" />
      <input
        type="text"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Buscar produtos..."
        className="busca-input"
      />
    </div>
  );
}