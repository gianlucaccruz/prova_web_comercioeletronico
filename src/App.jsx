import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Catalogo from './pages/Catalogo.jsx'
import Carrinho from './pages/Carrinho.jsx'
import Checkout from './pages/Checkout.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <footer className="footer">
        F1-Sampa Store © 2026 — Produto acadêmico, sem transações reais.
      </footer>
    </>
  )
}
