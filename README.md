#  Pokédex App com React e Vite


Bem-vindo à minha Pokédex! Este projeto foi desenvolvido como um desafio para aprofundar meus conhecimentos no ecossistema React moderno. É uma Single-Page Application (SPA) totalmente responsiva que consome a [PokeAPI](https://pokeapi.co/) para exibir informações detalhadas sobre os Pokémon.

**[Acesse a demonstração ao vivo aqui!](https://nataliabrunelli.github.io/pokedex-react/)**

---

## 🚀 Funcionalidades Principais

*   **Listagem Paginada:** Navegue por todos os Pokémon com um sistema de "Carregar Mais" otimizado.
*   **Filtragem Dinâmica:** Filtre os Pokémon por Geração e por Tipo.
*   **Página de Detalhes:** Clique em um card para ver informações de tipos, habilidades (com descrição!) e movimentos.
*   **Roteamento Inteligente:** URLs limpas e compartilháveis para cada Pokémon (ex: `/pokemon/pikachu`).
*   **Tema Claro e Escuro:** Alterne entre os temas para uma melhor experiência visual.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

Este projeto foi construído com uma stack moderna, focada em performance, escalabilidade e uma excelente experiência de desenvolvimento.

| Ferramenta | Propósito |
| :--- | :--- |
| **React** | Biblioteca principal para a construção da interface de usuário. |
| **Vite** | Ferramenta de build extremamente rápida para um desenvolvimento ágil. |
| **React Router DOM** | Para roteamento do lado do cliente e criação da SPA. |
| **TanStack Query (React Query)** | Gerenciamento de estado do servidor, cache, paginação e buscas de dados. |
| **Styled-Components** | Para estilização CSS-in-JS, criação de temas e componentes visuais. |
| **Axios** | Cliente HTTP para fazer as requisições à PokeAPI. |
| **gh-pages** | Para automatizar o processo de deploy no GitHub Pages. |
| **ESLint** | Para garantir a qualidade e a padronização do código. |

---

## 🧠 Desafios e Soluções

A construção desta Pokédex apresentou desafios interessantes que foram cruciais para o aprendizado:

1.  **Gerenciamento de Estado do Servidor:**
    *   **Desafio:** Gerenciar estados de `loading`, `error`, cache e paginação infinita de forma manual com `useState` e `useEffect` era complexo e propenso a erros.
    *   **Solução:** Adotei o **TanStack Query (React Query)**. Usei `useInfiniteQuery` para a listagem principal e `useQuery` com a opção `enabled` para alternar inteligentemente entre a busca por geração e a busca por tipo.

2.  **Navegação e Busca por Parâmetro de Rota:**
    *   **Desafio:** Como criar uma página de detalhes única para cada Pokémon que fosse acessível por uma URL direta (ex: `/pokemon/pikachu`)? A solução não poderia depender de passar dados via estado global, pois isso quebraria o compartilhamento de links e o recarregamento da página.
    *   **Solução:** A arquitetura foi baseada na sinergia entre o **React Router** e o **TanStack Query**:
        1.  **Rota Dinâmica:** Foi definida uma rota com um parâmetro dinâmico: `<Route path="/pokemon/:pokemonName" ... />`.
        2.  **Navegação com `<Link>`:** Cada card de Pokémon foi envolvido em um `<Link to={'/pokemon/${pokemon.name}'}>` para gerar a URL correta.
        3.  **Captura do Parâmetro:** O hook **`useParams()`** do React Router foi usado para extrair o `pokemonName` da URL na página de detalhes.
        4.  **Busca Acionada pela Rota:** O `pokemonName` extraído foi usado diretamente na **`queryKey`** do `useQuery` (`queryKey: ['pokemon', pokemonName]`), criando um vínculo poderoso que aciona a busca de dados automaticamente sempre que a URL muda.

3.  **Orquestração de Dados Dependentes:**
    *   **Desafio:** A página de detalhes precisava dos dados básicos do Pokémon e, em seguida, dos detalhes de cada uma de suas habilidades, que vinham de outras URLs.
    *   **Solução:** Modifiquei a função `fetch` para orquestrar as chamadas. Após buscar os dados principais, ela usa `Promise.all` para buscar os detalhes de todas as habilidades em paralelo, retornando um único objeto coeso para a UI e otimizando o tempo de carregamento.

---

## ⚙️ Como Executar o Projeto Localmente

Para rodar este projeto na sua máquina, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/nataliabrunelli/pokedex-react.git
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd pokedex-react
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta que o Vite indicar).


---

*Desenvolvido com ❤️ e muita cafeína por [Natália Brunelli](https://github.com/nataliabrunelli)!*
