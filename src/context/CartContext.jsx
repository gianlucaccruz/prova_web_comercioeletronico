import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

const FRETE_FIXO = 25.0
const CUPOM_VALIDO = 'INTERLAGOS10'
const DESCONTO_CUPOM = 0.1 // 10%

export function CartProvider({ children }) {
  // Carrega o carrinho do localStorage ao iniciar (persistência)
  const [itens, setItens] = useState(() => {
    const salvo = localStorage.getItem('f1sampa_carrinho')
    return salvo ? JSON.parse(salvo) : []
  })

  const [cupom, setCupom] = useState(() => localStorage.getItem('f1sampa_cupom') || '')
  const [entrega, setEntrega] = useState(() => localStorage.getItem('f1sampa_entrega') || 'casa')

  // Sempre que o carrinho mudar, salva no localStorage
  useEffect(() => {
    localStorage.setItem('f1sampa_carrinho', JSON.stringify(itens))
  }, [itens])

  useEffect(() => {
    localStorage.setItem('f1sampa_cupom', cupom)
  }, [cupom])

  useEffect(() => {
    localStorage.setItem('f1sampa_entrega', entrega)
  }, [entrega])

  function adicionarAoCarrinho(produto) {
    setItens((atual) => {
      const existe = atual.find((i) => i.id === produto.id)
      if (existe) {
        return atual.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        )
      }
      return [...atual, { ...produto, quantidade: 1 }]
    })
  }

  function removerDoCarrinho(id) {
    setItens((atual) => atual.filter((i) => i.id !== id))
  }

  function alterarQuantidade(id, quantidade) {
    if (quantidade < 1) return
    setItens((atual) =>
      atual.map((i) => (i.id === id ? { ...i, quantidade } : i))
    )
  }

  function limparCarrinho() {
    setItens([])
    setCupom('')
  }

  function aplicarCupom(codigo) {
    if (codigo.trim().toUpperCase() === CUPOM_VALIDO) {
      setCupom(codigo.trim().toUpperCase())
      return { sucesso: true, mensagem: 'Cupom aplicado! 10% de desconto.' }
    }
    setCupom('')
    return { sucesso: false, mensagem: 'Cupom inválido.' }
  }

  const subtotal = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0)
  const desconto = cupom === CUPOM_VALIDO ? subtotal * DESCONTO_CUPOM : 0
  const frete = entrega === 'casa' ? FRETE_FIXO : 0
  const total = subtotal - desconto + frete

  const value = {
    itens,
    adicionarAoCarrinho,
    removerDoCarrinho,
    alterarQuantidade,
    limparCarrinho,
    cupom,
    aplicarCupom,
    entrega,
    setEntrega,
    subtotal,
    desconto,
    frete,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const contexto = useContext(CartContext)
  if (!contexto) throw new Error('useCart precisa estar dentro de CartProvider')
  return contexto
}
