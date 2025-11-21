import Footer from './components/Footer'
import Header from './components/Header'
import { Link } from 'react-router-dom'
import './index.css'
import { useEffect, useState, useRef } from 'react'
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

  const listarProdutos = produtos.slice(0,6).map(produto => (
    <CardProduto key={produto.id} produto={produto} setProdutos={setProdutos} />
  ))
  const carouselRef = useRef(null)

  function scrollLeft() {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth * 0.8, behavior: 'smooth' })
  }
  function scrollRight() {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <>
      <Header />

      <main className='bg-a-claro h-full flex flex-col items-center pt-10 pb-20'>
        <h2 className='text-3xl md:text-4xl font-text text-a-agua text-outline-3'>Os mais vendidos:</h2>

        <div className='bg-a-agua flex flex-col items-center px-4 py-10 rounded-lg mx-8 gap-8'>
          <div className='relative w-full flex items-center justify-center'>
            <button
              type='button'
              aria-label='Anterior'
              onClick={scrollLeft}
              className='absolute -left-14 top-1/2 -translate-y-1/2'
            >
              <img src="./Seta Esquerda.png" alt="seta esquerda" className='w-20 h-20 pointer-events-none' />
            </button>

            <div
              ref={carouselRef}
              className='flex gap-8 px-5 w-full overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth'
            >
              {listarProdutos}
            </div>

            <button
              type='button'
              aria-label='Próximo'
              onClick={scrollRight}
              className='absolute -right-14 top-1/2 -translate-y-1/2'
            >
              <img src="./Seta Direita.png" alt="seta direita" className='w-20 h-20 pointer-events-none' />
            </button>
          </div>
          <Link to="/Loja" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-1xl md:text-3xl text-a-agua text-outline-3 drop-shadow-xl/50' >Ver todos os produtos</Link>
        </div>

      </main>

      <Footer />
    </>
  )
}

export default App
