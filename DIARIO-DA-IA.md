# 📔 Diário da IA: Registro de Erros, Diagnósticos e Correções

Este diário documenta cinco inconsistências ou falhas cometidas pela Inteligência Artificial durante o desenvolvimento do projeto **Vitrine Alegre**, destacando como os erros foram identificados e resolvidos.

---

### ❌ Erro 1: Duplicação e Desincronização do Estado do Carrinho

* **Descrição do Erro:** A IA gerou o gerenciamento de estado do carrinho em dois lugares distintos: no componente `App.jsx` usando a chave `'carrinho_produtos'` no `localStorage`, e no `CarrinhoContext.jsx` usando a chave `'carrinho_vitrine'`.
* **Como foi percebido:** Ao adicionar itens pela Home ou Vitrine, o contador indicava que o item foi adicionado, mas ao abrir a página `/carrinho`, a lista aparecia vazia.
* **Como foi corrigido:** O estado local do `App.jsx` foi removido e todo o gerenciamento de adicionar, remover e atualizar quantidade foi centralizado unicamente dentro do `CarrinhoContext.jsx`.

---

### ❌ Erro 2: Incompatibilidade de Parâmetros na Função de Adição

* **Descrição do Erro:** No componente `DetalheProduto.jsx`, a IA implementou a chamada `aoAdicionarComToast(tituloTraduzido)`, passando apenas uma `string` com o título do produto. No entanto, a função receptora esperava um objeto de produto completo (`produto.id`, `produto.price`, etc.).
* **Como foi percebido:** A adição de produtos através da página de detalhes falhava silenciosamente e o item não aparecia no carrinho.
* **Como foi corrigido:** A chamada da função foi atualizada para passar o objeto do produto completo juntamente com a quantidade selecionada: `aoAdicionarComToast(produto, quantidade)`.

---

### ❌ Erro 3: Ausência do Componente `<Link>` no Card do Produto

* **Descrição do Erro:** Na renderização dos produtos em `CardProduto.jsx`, a IA gerou os elementos HTML (`<img>`, `<h3>`) como tags estáticas sem envolvimento por links de navegação do `react-router-dom`.
* **Como foi percebido:** Ao clicar nos produtos listados na página inicial, nenhuma ação ocorria e a URL não mudava para `/produto/:id`.
* **Como foi corrigido:** O título e a imagem do produto foram envolvidos com o componente `<Link to={`/produto/${produto.id}`}>`, além da inclusão do método `e.stopPropagation()` no botão de "Adicionar" para conter a propagação de eventos.

---

### ❌ Erro 4: Atualizações de Estado Assíncronas em Laço `for`

* **Descrição do Erro:** Para adicionar múltiplas quantidades de um produto a partir da tela de detalhes, a IA escreveu um laço `for` que chamava `adicionarAoCarrinho(produto)` repetidamente dentro de um loop.
* **Como foi percebido:** Devido ao funcionamento assíncrono e em lote (*batching*) do `setState` no React, itens eram perdidos e a quantidade adicionada ficava incorreta no carrinho.
* **Como foi corrigido:** A função de adição no contexto foi modificada para aceitar um segundo argumento numérico (`quantidade`), incrementando o valor em uma única operação.

---

### ❌ Erro 5: Erro 404 em Múltiplas Rotas no Deploy (Vercel)

* **Descrição do Erro:** Ao realizar o deploy da aplicação no Vercel, a IA não configurou as regras de reescrita (*rewrites*) para roteamento no lado do cliente (Single Page Application).
* **Como foi percebido:** A aplicação funcionava ao navegar a partir da Home, mas ao dar *refresh* (F5) estando na rota `/produto/1` ou `/carrinho`, a Vercel retornava erro `404 Not Found`.
* **Como foi corrigido:** Foi criado o arquivo de configuração `vercel.json` na raiz do projeto instruindo o servidor a redirecionar todas as requisições de rota para a entrada principal `index.html`.