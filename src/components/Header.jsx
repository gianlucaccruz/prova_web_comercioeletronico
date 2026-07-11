import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Header() {
  const { itens } = useCart()
  const totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0)

  return (
    <header className="header">
      <Link to="/" className="logo">
        🏁 F1-Sampa <span>Store</span>
      </Link>
      <nav className="nav">
        <Link to="/">Início</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/carrinho" className="carrinho-link">
          🛒 Carrinho
          {totalItens > 0 && <span className="badge">{totalItens}</span>}
        </Link>
      </nav>
    </header>
  )
}
