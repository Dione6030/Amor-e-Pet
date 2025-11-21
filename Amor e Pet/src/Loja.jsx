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

            const termo = (data.pesquisa || '').trim().toUpperCase()
            let filtrados = dados.filter(produto => {
                if (!termo) return true
                return produto.nome.toUpperCase().includes(termo) ||
                       (produto.categorias || '').toUpperCase().includes(termo)
            })

            // Ordenação por preço
            if (data.ordemPreco === 'asc') {
                filtrados.sort((a,b) => a.preco - b.preco)
            } else if (data.ordemPreco === 'desc') {
                filtrados.sort((a,b) => b.preco - a.preco)
            }

            if (filtrados.length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Não há produtos com a palavra-chave no nome ou categoria",
                });
            }
            setProdutos(filtrados)
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
    }, [reset])

    const listarProdutos = produtos.map(produto => (
        <CardProduto key={produto.id} produto={produto} setProdutos={setProdutos} />
    ))

    function pesquisandoProduto() {
        MySwal.fire({
            title: <h2 className="bg-a-claro text-3xl md:text-4xl font-text text-a-agua text-outline-3 h-12 items-center flex justify-center rounded-2xl border">Pesquisar Produto</h2>,
            html: (
                <form onSubmit={handleSubmit(pesquisarProdutos)} onReset={reset} className="bg-a-claro flex flex-col justify-evenly gap-8 p-4 rounded-2xl border">
                    <p className="flex flex-col w-full gap-4">
                        <label htmlFor="pesquisa" className="font-text text-a-agua text-outline-2 text-xl">Nome ou categoria do produto</label>
                        <input type="text" id="pesquisa" 
                        className="bg-a-agua rounded-2xl border" 
                        {...register("pesquisa")} />
                    </p>
                    <p className="flex flex-col w-full">
                        <span className="font-text text-a-agua text-outline-2 text-xl">Ordem de Preço</span>
                        <div className="flex gap-4 justify-evenly items-end">
                            <label className="flex items-center gap-2">
                                <input type="radio" value="asc" {...register("ordemPreco")} />
                                <span className="font-text text-a-agua text-outline-2 text-lg">Menor Preço</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" value="desc" {...register("ordemPreco")} />
                                <span className="font-text text-a-agua text-outline-2 text-lg">Maior Preço</span>
                            </label>
                        </div>
                    </p>

                    <div className="flex gap-8 items-center justify-evenly">
                        <button type="submit" className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-1xl md:text-3xl text-a-agua text-outline-3">Pesquisar</button>
                        <button type="reset" className="border border-white rounded-lg bg-red-600 px-3 py-2 font-text text-1xl md:text-3xl text-a-agua text-outline-3">Voltar</button>
                    </div>
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
                <Link to="/Carrinho" className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50">Carrinho</Link>
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