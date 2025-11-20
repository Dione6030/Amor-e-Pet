import { useState } from 'react'

const Carrinho = () => {
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: 'Pé de Galinha 5 UND',
      preco: 29.80,
      imagem: '/pedegalinha.png',
      oferta: true
    },
    {
      id: 2,
      nome: 'Pipoca de Boi 30g',
      preco: 26.90,
      imagem: '/pedegalinha.png', // Usando a mesma imagem como placeholder
      oferta: true
    },
    {
      id: 3,
      nome: 'Orelha de Boi 5 UND',
      preco: 32.50,
      imagem: '/pedegalinha.png', // Usando a mesma imagem como placeholder
      oferta: true
    }
  ])

  const removerProduto = (id) => {
    setProdutos(produtos.filter(produto => produto.id !== id))
  }

  const finalizarCompra = () => {
    alert('Compra finalizada com sucesso!')
    setProdutos([])
  }

  const cancelarCompra = () => {
    if (window.confirm('Tem certeza que deseja cancelar a compra?')) {
      setProdutos([])
      alert('Compra cancelada!')
    }
  }

  const calcularTotal = () => {
    return produtos.reduce((total, produto) => total + produto.preco, 0).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col w-full">
      {/* Header */}
      <header className="bg-[#41ACF5] w-full relative">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <div className="flex items-center space-x-3 shrink-0">
              <img 
                src="/logo-pata.png" 
                alt="Logo Amor & Pet" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-2xl font-bold text-black" style={{ textShadow: '1px 1px 2px #41ACF5, -1px -1px 2px #41ACF5, 1px -1px 2px #41ACF5, -1px 1px 2px #41ACF5' }}>
                Amor & Pet
              </span>
            </div>

            {/* Navegação - Centralizada */}
            <nav className="hidden justify-end lg:flex space-x-2 absolute left-1/2 transform -translate-x-1/2">
              <button className="px-4 py-2 bg-blue-700 text-[#41ACF5] rounded-lg shadow-[0_2px_4px_rgba(200,200,200,0.5)] hover:bg-blue-800 transition font-bold" style={{ textShadow: '1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black' }}>
                Home
              </button>
              <button className="px-4 py-2 bg-blue-700 text-[#41ACF5] rounded-lg shadow-[0_2px_4px_rgba(200,200,200,0.5)] hover:bg-blue-800 transition font-bold" style={{ textShadow: '1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black' }}>
                Agendamentos
              </button>
              <button className="px-4 py-2 bg-blue-700 text-[#41ACF5] rounded-lg shadow-[0_2px_4px_rgba(200,200,200,0.5)] hover:bg-blue-800 transition font-bold" style={{ textShadow: '1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black' }}>
                Meu Pet
              </button>
              <button className="px-4 py-2 bg-blue-700 text-[#41ACF5] rounded-lg shadow-[0_2px_4px_rgba(200,200,200,0.5)] hover:bg-blue-800 transition font-bold" style={{ textShadow: '1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black' }}>
                Login
              </button>
            </nav>

            {/* Ícones */}
            <div className="flex items-center space-x-4 shrink-0">
              <button className="w-10 h-10 rounded-full bg-blue-700 border-2 border-gray-300 flex items-center justify-center hover:bg-blue-800 transition shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition">
                <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Linha roxa abaixo do header */}
        <div className="w-full h-0.5 bg-purple-300"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-full">
          {/* Lista de Produtos */}
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Carrinho de Compras</h1>
            
            {produtos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Seu carrinho está vazio</p>
              </div>
            ) : (
              produtos.map((produto) => (
                <div key={produto.id} className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col md:flex-row gap-6">
                  {/* Imagem do Produto */}
                  <div className="relative w-full md:w-48 h-48 shrink-0">
                    {produto.oferta && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded text-sm font-bold z-10">
                        OFERTA!
                      </div>
                    )}
                    <img 
                      src={produto.imagem} 
                      alt={produto.nome}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200?text=Produto'
                      }}
                    />
                  </div>

                  {/* Informações do Produto */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {produto.nome}
                      </h2>
                      <p className="text-2xl font-bold text-blue-700">
                        R$ {produto.preco.toFixed(2).replace('.', ',')}
                      </p>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex gap-4 mt-4">
                      <button 
                        className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition font-medium"
                        onClick={() => alert(`Produto ${produto.nome} adicionado novamente!`)}
                      >
                        Comprar
                      </button>
                      <button 
                        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
                        onClick={() => removerProduto(produto.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Painel de Ações */}
          {produtos.length > 0 && (
            <div className="lg:w-80 shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Resumo</h2>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">R$ {calcularTotal().replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Frete:</span>
                    <span className="font-semibold">A calcular</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800">Total:</span>
                      <span className="text-lg font-bold text-blue-700">R$ {calcularTotal().replace('.', ',')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    className="w-full px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-bold text-lg border-2 border-blue-800"
                    onClick={finalizarCompra}
                  >
                    Finalizar Compra
                  </button>
                  <button 
                    className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-bold text-lg border-2 border-red-700"
                    onClick={cancelarCompra}
                  >
                    Cancelar Compra
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 mt-auto w-full">
        <div className="w-full px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Contato */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(53) 99833 6666</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>suport@amorepet.com</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm">
              Copyright © Amor e Pet 2025
            </div>

            {/* Redes Sociais */}
            <div className="flex items-center gap-4">
              <a href="#" className="hover:opacity-80 transition" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition" aria-label="WhatsApp">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Carrinho

