import { useNavigate } from 'react-router-dom'
import produtos from '../data/produtos.json'
import ProductCard from '../components/ProductCard.jsx'

const escuderias = [...new Set(produtos.map((p) => p.escuderia))]

export default function Home() {
  const navigate = useNavigate()
  const destaques = produtos.filter((p) => p.destaque)

  function irParaCatalogo(escuderia) {
    navigate(`/catalogo?escuderia=${encodeURIComponent(escuderia)}`)
  }

  return (
    <div>
      <section className="banner">
        <h1>GP DE SÃO PAULO 2026</h1>
        <p>Autódromo de Interlagos • Novembro • Vista sua paixão pela F1</p>
        <button onClick={() => navigate('/catalogo')}>Ver Catálogo Completo</button>
      </section>

      <section className="secao">
        <h2>Filtrar por Escuderia</h2>
        <div className="filtros">
          {escuderias.map((esc) => (
            <button key={esc} className="filtro-btn" onClick={() => irParaCatalogo(esc)}>
              {esc}
            </button>
          ))}
        </div>
      </section>

      <section className="secao">
        <h2>Destaques da Semana</h2>
        <div className="grid-produtos">
          {destaques.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </section>
    </div>
  )
}
