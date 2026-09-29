// const MAPA_CATEGORIAS = {
//   'beauty': 'Beleza',
//   'fragrances': 'Perfumes',
//   'furniture': 'Móveis',
//   'groceries': 'Mercado',
//   'home-decoration': 'Decoração',
//   'kitchen-accessories': 'Acessórios de Cozinha',
//   'laptops': 'Notebooks',
//   'mens-shirts': 'Camisas Masculinas',
//   'mens-shoes': 'Sapatos Masculinos',
//   'mens-watches': 'Relógios Masculinos',
//   'mobile-accessories': 'Acessórios p/ Celular',
//   'motorcycle': 'Motos',
//   'skin-care': 'Cuidados com a Pele',
//   'smartphones': 'Smartphones',
//   'sports-accessories': 'Acessórios Esportivos',
//   'sunglasses': 'Óculos de Sol',
//   'tablets': 'Tablets',
//   'tops': 'Roupas Superiores',
//   'vehicle': 'Veículos',
//   'womens-bags': 'Bolsas Femininas',
//   'womens-dresses': 'Vestidos',
//   'womens-jewellery': 'Joias Femininas',
//   'womens-shoes': 'Sapatos Femininos',
//   'womens-watches': 'Relógios Femininos',
// };

// export default function FiltroCategorias({ categorias, ativa, aoSelecionar }) {
//   return (
//     <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full scrollbar-thin">
//       <button
//         onClick={() => aoSelecionar('')}
//         className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
//           ativa === ''
//             ? 'bg-brand-dark text-white'
//             : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
//         }`}
//       >
//         Todas
//       </button>

//       {categorias.map((cat) => {
//         // Suporta tanto array de strings ['beauty', ...] quanto array de objetos [{ slug: 'beauty', name: 'Beauty' }]
//         const slug = typeof cat === 'object' ? cat.slug : cat;
//         const nomeOriginal = typeof cat === 'object' ? cat.name : cat;
//         const nomeTraduzido = MAPA_CATEGORIAS[slug] || nomeOriginal;

//         return (
//           <button
//             key={slug}
//             onClick={() => aoSelecionar(slug)}
//             className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
//               ativa === slug
//                 ? 'bg-brand-dark text-white'
//                 : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
//             }`}
//           >
//             {nomeTraduzido}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

const MAPA_CATEGORIAS = {
  'beauty': 'Beleza',
  'fragrances': 'Perfumes',
  'furniture': 'Móveis',
  'groceries': 'Mercado',
  'home-decoration': 'Decoração',
  'kitchen-accessories': 'Acessórios de Cozinha',
  'laptops': 'Notebooks',
  'mens-shirts': 'Camisas Masculinas',
  'mens-shoes': 'Sapatos Masculinos',
  'mens-watches': 'Relógios Masculinos',
  'mobile-accessories': 'Acessórios p/ Celular',
  'motorcycle': 'Motos',
  'skin-care': 'Cuidados com a Pele',
  'smartphones': 'Smartphones',
  'sports-accessories': 'Acessórios Esportivos',
  'sunglasses': 'Óculos de Sol',
  'tablets': 'Tablets',
  'tops': 'Roupas Superiores',
  'vehicle': 'Veículos',
  'womens-bags': 'Bolsas Femininas',
  'womens-dresses': 'Vestidos',
  'womens-jewellery': 'Joias Femininas',
  'womens-shoes': 'Sapatos Femininos',
  'womens-watches': 'Relógios Femininos',
};

export default function FiltroCategorias({ categorias, ativa, aoSelecionar }) {
  return (
    <div className="categorias-scroll">
      <button
        onClick={() => aoSelecionar('')}
        className={`btn-categoria ${ativa === '' ? 'ativa' : 'inativa'}`}
      >
        Todas
      </button>

      {categorias.map((cat) => {
        const slug = typeof cat === 'object' ? cat.slug : cat;
        const nomeOriginal = typeof cat === 'object' ? cat.name : cat;
        const nomeTraduzido = MAPA_CATEGORIAS[slug] || nomeOriginal;

        return (
          <button
            key={slug}
            onClick={() => aoSelecionar(slug)}
            className={`btn-categoria ${ativa === slug ? 'ativa' : 'inativa'}`}
          >
            {nomeTraduzido}
          </button>
        );
      })}
    </div>
  );
}