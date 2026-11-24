# menu-cms

Painel administrativo (CMS) do restaurante **Mater Burguer**. É a tela onde a equipe gerencia o cardápio digital e acompanha os pedidos.

O sistema pega e envia tudo para a API NestJS (`menu-backend`) feita no primeiro bimestre. Não tem dado fixo no código: tudo vem da API.

## O que o sistema faz

| Área | O que faz |
|---|---|
| **Categorias** | Lista, cadastra, edita e exclui (nome, ícone, ordem de exibição e situação) |
| **Produtos** | Lista, cadastra, edita e exclui, com filtro por categoria, preço em reais (R$) e marcações de vegetariano e novidade |
| **Mesas** | Lista, cadastra, edita e exclui |
| **Comandas** | Mostra as comandas abertas (mesa, data de abertura e total acumulado) e abre os detalhes de cada uma |
| **Pedidos** | Mostra os pedidos de uma comanda (itens, quantidades, preços e totais) e muda o status |
| **Kanban** (bônus) | Quadro com colunas por status; arrastar o cartão muda o status do pedido na API |

Todas as telas têm aviso de carregando, erro e lista vazia. Toda ação de criar, editar, excluir ou mudar status mostra um aviso (toast) na tela dizendo se deu certo ou erro.

## Tecnologias usadas

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Axios**: uma instância única em `src/lib/axios.ts`, pegando a URL base do `VITE_API_URL`
- **TanStack Query**: `useQuery` para buscar dados e `useMutation` para alterar dados, atualizando a tela com `invalidateQueries` quando dá certo

## Como rodar o projeto

### O que precisa ter instalado

- Node.js 20.19 ou maior
- O `menu-backend` rodando (por padrão em `http://localhost:3000`)

### Passo a passo

```bash
# 1. Instalar as dependências
npm install

# 2. Criar o arquivo .env copiando o exemplo
cp .env.example .env

# 3. Iniciar o projeto em modo de desenvolvimento
npm run dev