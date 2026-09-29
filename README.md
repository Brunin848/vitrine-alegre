Links: 
Github -> https://github.com/Brunin848/vitrine-alegre
Vercel -> https://vitrine-alegre-psi.vercel.app/

# 🛒 Vitrine Alegre

Uma aplicação e-commerce responsiva desenvolvida em React, com catálogo de produtos, navegação para detalhes do produto, gerenciamento de carrinho e simulação de finalização de compra.

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [Git](https://git-scm.com/)

---

## 🚀 Passo a Passo: Rodando o Projeto do Zero

### 1. Clonar o Repositório
Abra o seu terminal (Terminal, PowerShell ou Git Bash) e execute:
```bash
git clone https://github.com/Brunin848/vitrine-alegre.git
```

### 2. Acessar a Pasta do Projeto
```bash
cd vitrine-alegre
```

### 3. Instalar as Dependências
Execute o comando abaixo para baixar todas as bibliotecas necessárias do projeto:
```bash
npm install
```

### 4. Executar o Servidor de Desenvolvimento
Inicie a aplicação localmente:
```bash
npm run dev
```
*(Se o projeto utilizar Create React App, utilize `npm start`).*

### 5. Acessar no Navegador
Abra o seu navegador e acesse a URL exibida no terminal (geralmente `http://localhost:5173` ou `http://localhost:3000`).

---

## 🛠️ Tecnologias Utilizadas

* **React**: Biblioteca principal para interface do usuário.
* **React Router DOM**: Gerenciamento de rotas e navegação client-side (`/`, `/produto/:id`, `/carrinho`).
* **Context API**: Gerenciamento global de estado do carrinho de compras.
* **Vite**: Build tool e servidor de desenvolvimento.
* **Vercel**: Plataforma de hospedagem e deployment contínuo.

---

## ⚙️ Configuração para Deployment (Vercel)

Para evitar erros de página não encontrada (404) ao recarregar a tela em rotas como `/produto/:id`, o projeto conta com um arquivo `vercel.json` na raiz:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```