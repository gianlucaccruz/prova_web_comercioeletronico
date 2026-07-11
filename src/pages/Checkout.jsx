import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout() {
  const { itens, total, entrega, limparCarrinho } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome: '',
    endereco: '',
    pagamento: 'cartao',
  })
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Simulação de pagamento — nenhuma transação real é processada
    setPedidoConfirmado(true)
    limparCarrinho()
  }

  if (itens.length === 0 && !pedidoConfirmado) {
    return (
      <div className="secao">
        <h1>Checkout</h1>
        <p>Seu carrinho está vazio.</p>
        <button onClick={() => navigate('/catalogo')}>Ver Produtos</button>
      </div>
    )
  }

  if (pedidoConfirmado) {
    return (
      <div className="secao confirmacao">
        <h1>🏁 Pedido Confirmado!</h1>
        <p>Obrigado, {form.nome || 'piloto'}! Seu pedido foi simulado com sucesso.</p>
        <p>Nos vemos em Interlagos em Novembro!</p>
        <button onClick={() => navigate('/')}>Voltar ao Início</button>
      </div>
    )
  }

  return (
    <div className="secao">
      <h1>Finalizar Compra</h1>

      <form className="form-checkout" onSubmit={handleSubmit}>
        <label>
          Nome Completo
          <input
            type="text"
            name="nome"
            required
            value={form.nome}
            onChange={handleChange}
          />
        </label>

        {entrega === 'casa' ? (
          <label>
            Endereço de Entrega (hotel ou residência em São Paulo)
            <input
              type="text"
              name="endereco"
              placeholder="Ex: Hotel Copa, Av. Paulista, 1000"
              required
              value={form.endereco}
              onChange={handleChange}
            />
          </label>
        ) : (
          <p className="info-retirada">
            📍 Retirada no Stand F1-Sampa em Interlagos — sem necessidade de endereço.
          </p>
        )}

        <fieldset>
          <legend>Forma de Pagamento</legend>
          <label>
            <input
              type="radio"
              name="pagamento"
              value="cartao"
              checked={form.pagamento === 'cartao'}
              onChange={handleChange}
            />
            Cartão de Crédito
          </label>
          <label>
            <input
              type="radio"
              name="pagamento"
              value="pix"
              checked={form.pagamento === 'pix'}
              onChange={handleChange}
            />
            Pix
          </label>
        </fieldset>

        {form.pagamento === 'cartao' && (
          <div className="dados-cartao">
            <input type="text" placeholder="Número do Cartão (simulado)" maxLength={16} />
            <div className="linha">
              <input type="text" placeholder="Validade" maxLength={5} />
              <input type="text" placeholder="CVV" maxLength={3} />
            </div>
          </div>
        )}

        {form.pagamento === 'pix' && (
          <p className="info-pix">💠 Um QR Code simulado seria exibido aqui.</p>
        )}

        <h2>Total a Pagar: R$ {total.toFixed(2).replace('.', ',')}</h2>

        <button type="submit" className="btn-confirmar">
          Confirmar Pedido (Simulação)
        </button>
      </form>
    </div>
  )
}
