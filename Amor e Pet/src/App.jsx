import Footer from './components/Footer'
import Header from './components/Header'
import { Link } from 'react-router-dom'
import './index.css'
import { useEffect, useState } from 'react'
import CardProduto from './components/CardProduto'

function App() {
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const resposta = await fetch("http://localhost:3000/produtos")
        if (!resposta.ok) throw new Error("Erro ao consultar os produtos")
        const dados = await resposta.json()
        
        setProdutos(dados.reverse())
      } catch (error) {
        console.log("Erro: ", error.message)
      }
    }
    buscarProdutos()
  }, [])

  //somente 6 itens para destacar
  const listarProdutos = produtos.slice(0,6).map(produto => (
    <CardProduto key={produto.id} produto={produto} setProdutos={setProdutos} />
  ))

  return (
    <>
      <Header />

      <main className='bg-a-claro h-full flex flex-col items-center pt-10 pb-20'>
        <h2 className='text-3xl md:text-4xl font-text text-a-agua text-outline-3'>Os mais vendidos:</h2>

        <div className='bg-a-agua flex flex-col items-center px-4 py-10 rounded-lg mx-8 gap-8'>
          {/* Área dos cards vira contêiner relativo para posicionar setas */}
          <div className='relative w-full flex items-center justify-center'>
            {/* Botão esquerda */}
            <button
              type='button'
              aria-label='Anterior'
              className='absolute left-2 md:-left-10 top-1/2 -translate-y-1/2 flex items-center justify-center'
            >
              <img src="./Seta Esquerda.png" alt="" className='w-20 h-20' />
            </button>

            <div className='flex flex-wrap justify-center gap-8 px-5 w-full md:max-w-4xl'>
              {listarProdutos}
            </div>

            {/* Botão direita */}
            <button
              type='button'
              aria-label='Próximo'
              className='absolute right-2 md:-right-10 top-1/2 -translate-y-1/2 flex items-center justify-center '
            >
              <img src="./Seta Direita.png" alt="" className='w-20 h-20' />
            </button>
          </div>
          <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-2xl md:text-3xl text-a-agua text-outline-3' >Ver todos os produtos</Link>
        </div>

      </main>

      <Footer />
    </>
  )
}

export default App
