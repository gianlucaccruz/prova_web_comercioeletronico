# prova_web_comercioeletronico
Prova das matérias NOVAS LINGUAGENS WEB E FRAMEWORKS (ATVS26-1) | COMÉRCIO ELETRÔNICO (ATVS26-1) da professora Rita de Cássio Marroco

Tecnologias utilizadas:
React 18 | Vite | React Router | DOM | Context API + localStorage | CSS 
Dados de produtos simulados em `src/data/produtos.json` (simula uma API/base de dados; pode ser facilmente trocado por uma API REST real)

Funcionalidades:
Home -  banner temático do GP de São Paulo, produtos em destaque e filtro rápido por escuderia.
Catálogo - listagem completa de produtos com imagem, nome, preço, avaliação e botão "Adicionar ao Carrinho"; filtro por escuderia e busca por produto/piloto.
Carrinho de Compras - alteração de quantidade, remoção de itens, cálculo de total dinâmico, cupom de desconto e escolha do tipo de entrega.
Checkout simulado - formulário de entrega (hotel/residência em São Paulo), escolha entre Cartão de Crédito ou Pix, e confirmação do pedido (nenhuma transação real é processada).
Cupom 'INTERLAGOS10' - aplica 10% de desconto sobre o subtotal do carrinho.
Entrega - opção de "Receber em Casa" (frete fixo de R$ 25,00) ou "Retirar no Stand da F1-Sampa em Interlagos" (frete grátis).
Persistência - o carrinho é salvo no `localStorage` do navegador e permanece mesmo após atualizar a página.

- Como rodar o projeto
Pré-requisitos: [Node.js](https://nodejs.org) instalado (versão 18+).

1. Instalar as dependências
npm install

2. Rodar o projeto em modo de desenvolvimento
npm run dev

Depois é só abrir o endereço mostrado no terminal ('http://localhost:5173' ou algo parecido).
