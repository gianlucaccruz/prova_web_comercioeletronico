import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Carrinho() {
  const {
    itens,
    removerDoCarrinho,
    alterarQuantidade,
    cupom,
    aplicarCupom,
    subtotal,
    desconto,
    frete,
    total,
    entrega,
    setEntrega,
  } = useCart()

  const [codigoCupom, setCodigoCupom] = useState('')
  const [mensagemCupom, setMensagemCupom] = useState('')
  const navigate = useNavigate()

  function formatar(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`
  }

  function handleAplicarCupom() {
    const resultado = aplicarCupom(codigoCupom)
    setMensagemCupom(resultado.mensagem)
  }

  if (itens.length === 0) {
    return (
      <div className="secao">
        <h1>Seu Carrinho</h1>
        <p>Seu carrinho está vazio.</p>
        <button onClick={() => navigate('/catalogo')}>Ver Produtos</button>
      </div>
    )
  }

  return (
    <div className="secao">
      <h1>Seu Carrinho</h1>

      <div className="lista-carrinho">
        {itens.map((item) => (
          <div key={item.id} className="item-carrinho">
            <img src={item.imagem} alt={item.nome} />
            <div className="item-info">
              <h3>{item.nome}</h3>
              <p>{item.escuderia}</p>
              <p className="card-preco">{formatar(item.preco)}</p>
            </div>
            <div className="item-quantidade">
              <button onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}>-</button>
              <span>{item.quantidade}</span>
              <button onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}>+</button>
            </div>
            <p className="item-subtotal">{formatar(item.preco * item.quantidade)}</p>
            <button className="btn-remover" onClick={() => removerDoCarrinho(item.id)}>
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="opcoes-entrega">
        <h3>Opção de Entrega</h3>
        <label>
          <input
            type="radio"
            name="entrega"
            checked={entrega === 'casa'}
            onChange={() => setEntrega('casa')}
          />
          Receber em Casa/Hotel (frete R$ 25,00)
        </label>
        <label>
          <input
            type="radio"
            name="entrega"
            checked={entrega === 'interlagos'}
            onChange={() => setEntrega('interlagos')}
          />
          Retirar no Stand F1-Sampa em Interlagos (Frete Grátis)
        </label>
      </div>

      <div className="cupom">
        <input
          type="text"
          placeholder="Cupom de desconto (ex: INTERLAGOS10)"
          value={codigoCupom}
          onChange={(e) => setCodigoCupom(e.target.value)}
        />
        <button onClick={handleAplicarCupom}>Aplicar</button>
        {mensagemCupom && <p className="msg-cupom">{mensagemCupom}</p>}
        {cupom && <p className="msg-cupom-ativo">Cupom ativo: {cupom}</p>}
      </div>

      <div className="resumo-total">
        <p>Subtotal: {formatar(subtotal)}</p>
        {desconto > 0 && <p>Desconto: -{formatar(desconto)}</p>}
        <p>Frete: {frete === 0 ? 'Grátis' : formatar(frete)}</p>
        <h2>Total: {formatar(total)}</h2>
      </div>

      <button className="btn-checkout" onClick={() => navigate('/checkout')}>
        Ir para o Checkout
      </button>
    </div>
  )
}
