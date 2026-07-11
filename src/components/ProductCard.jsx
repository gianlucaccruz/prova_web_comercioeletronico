import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ produto }) {
  const { adicionarAoCarrinho } = useCart()

  return (
    <div className="card-produto">
      <img src={produto.imagem} alt={produto.nome} />
      <div className="card-info">
        <span className="card-escuderia">{produto.escuderia}</span>
        <h3>{produto.nome}</h3>
        <p className="card-piloto">{produto.piloto}</p>
        <p className="card-avaliacao">⭐ {produto.avaliacao.toFixed(1)}</p>
        <p className="card-preco">
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </p>
        <button onClick={() => adicionarAoCarrinho(produto)}>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  )
}
