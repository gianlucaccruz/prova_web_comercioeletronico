import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import produtos from '../data/produtos.json'
import ProductCard from '../components/ProductCard.jsx'

const escuderias = [...new Set(produtos.map((p) => p.escuderia))]

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const escuderiaAtiva = searchParams.get('escuderia') || ''
  const [busca, setBusca] = useState('')

  const produtosFiltrados = produtos.filter((p) => {
    const combinaEscuderia = escuderiaAtiva ? p.escuderia === escuderiaAtiva : true
    const combinaBusca = busca
      ? p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.piloto.toLowerCase().includes(busca.toLowerCase())
      : true
    return combinaEscuderia && combinaBusca
  })

  function selecionarEscuderia(esc) {
    if (esc) setSearchParams({ escuderia: esc })
    else setSearchParams({})
  }

  return (
    <div className="secao">
      <h1>Catálogo de Produtos</h1>

      <div className="filtros-catalogo">
        <select
          value={escuderiaAtiva}
          onChange={(e) => selecionarEscuderia(e.target.value)}
        >
          <option value="">Todas as Escuderias</option>
          {escuderias.map((esc) => (
            <option key={esc} value={esc}>
              {esc}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar por produto ou piloto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="grid-produtos">
        {produtosFiltrados.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
        {produtosFiltrados.length === 0 && <p>Nenhum produto encontrado.</p>}
      </div>
    </div>
  )
}
