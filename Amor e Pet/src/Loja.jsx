import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import CardProduto from "./components/CardProduto"

const MySwal = withReactContent(Swal)

function Loja() {
    const { register, handleSubmit, reset } = useForm()
    const [produtos, setProdutos] = useState([])

    async function pesquisarProdutos(data) {
        try {
            const resposta = await fetch("http://localhost:3000/produtos")
            if (!resposta.ok) throw new Error("Erro ao consultar os produtos")
            const dados = await resposta.json()
            const dados2 = dados.filter(produto => (
                produto.nome.toUpperCase().includes(data.pesquisa.toUpperCase()) ||
                produto.categoria.toUpperCase().includes(data.pesquisa.toUpperCase())
            ))
            if (dados2.length == 0) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Não há produtos com a palavra-chave no nome ou categoria",
                });
            } else {
                setProdutos(dados2)
            }
        } catch (erro) {
            console.log("Erro: ", erro.message)
        }
    }

    useEffect(() => {
        async function buscarProdutos() {
            try {
                const resposta = await fetch("http://localhost:3000/produtos")
                if (!resposta.ok) throw new Error("Erro ao consultar os produtos")
                const dados = await resposta.json()
                setProdutos(dados)
            } catch (erro) {
                console.log("Erro: ", erro.message)
            }
        }
        reset()
        buscarProdutos()
    }, [])

    const listarProdutos = produtos.map(produto => (
        <CardProduto key={produto.id} produto={produto} setProdutos={setProdutos} />
    ))

    function pesquisandoProduto() {
        MySwal.fire({
            title: <h2 className="bg-a-claro text-3xl md:text-4xl font-text text-a-agua text-outline-3">Pesquisar Produto</h2>,
            html: (
                <form onSubmit={handleSubmit(pesquisarProdutos)} onReset={reset()} className="bg-a-claro flex flex-col justify-evenly">
                    <p className="flex flex-col w-full">
                        <label htmlFor="Pesquisa" className="font-text text-a-agua text-outline-2 text-xl">Nome ou categoria do produto</label>
                        <input type="text" name="Pesquisa" id="Pesquisa" 
                        className="bg-a-agua rounded-2xl border" 
                        {...register("Pesquisa")} />
                    </p>
                    <p className="flex flex-col w-full">
                        <label htmlFor="preco" className="font-text text-a-agua text-outline-2 text-xl">Ordem de Preço</label>
                        <div className="flex gap-4 justify-evenly items-end">
                            <p>
                                <input type="radio" name="preco_baixo" id="preco_baixo"
                                {...register("preco_baixo")} />
                                <label htmlFor="preco_baixo" className="font-text text-a-agua text-outline-2 text-lg">Menor Preço</label>
                            </p>
                            <p>
                                <input type="radio" name="preco_alto" id="preco_alto"
                                {...register("preco_alto")} />
                                <label htmlFor="preco_alto" className="font-text text-a-agua text-outline-2 text-lg">Maior Preço</label>
                            </p>
                        </div>
                    </p>

                    <button type="submit" className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-1xl md:text-3xl text-a-agua text-outline-3">Pesquisar</button>
                    <button type="reset" className="border border-white rounded-lg bg-red-600 px-3 py-2 font-text text-1xl md:text-3xl text-a-agua text-outline-3">Voltar</button>
                </form>
            )
        })
    }

    function checaAdmin() {
        try {
            const raw = localStorage.getItem('usuarioLogado');
            if (raw) {
                const usuario = JSON.parse(raw);
                return usuario?.isAdmin;
            }
        } catch {
            return false;
        }
    }

    return (
        <>
        <Header />

        <main className="flex flex-col items-center justify-around gap-6 p-8 bg-a-claro">

            <div className="flex flex-col md:flex-row justify-around items-center gap-10 md:gap-20">
                {checaAdmin() && (
                    <Link to="/" className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50">Atualizar Loja</Link>
                )}
                <Link to="/" className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50">Carrinho</Link>
                <button onClick={pesquisandoProduto} className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50">Pesquisar produtos</button>
            </div>
            
            <div className='bg-a-agua flex flex-wrap justify-center gap-8 p-5 w-full md:max-w-4xl max-h-150 xl:max-h-160 xl:h-160 overflow-auto rounded-lg'>
              {listarProdutos}
            </div>

        </main>

        <Footer />
        </>
    )
}

export default Loja