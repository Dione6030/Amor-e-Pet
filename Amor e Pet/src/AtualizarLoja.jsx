import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import CardAtualizar from "./components/CardAtualizar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form";

const MySwal = withReactContent(Swal);


function AtualizarLoja() {
    const [ produtos, setProdutos ] = useState([])
    const { register, handleSubmit, reset } = useForm()

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
            } catch (error) {
                console.log("Erro: ", error.message)
            }
        }
        reset();
        buscarProdutos();
    }, [reset]);

    const listarProdutos = produtos.map((produto) => (
        <CardAtualizar key={produto.id} produto={produto} setProdutos={setProdutos} />
    ))

    async function adicionarProduto(data) {
        try {
            const resposta = await fetch("http://localhost:3000/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: data.nome,
                    categorias: data.categoria,
                    preco: data.preco,
                    img: data.img
                })
            })
            if (!resposta.ok) throw new Error("Erro ao adicionar o produto")
            MySwal.fire({
                icon: "success",
                title: "Produto adicionado com sucesso!",
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.error("Error:", error.message)
        }
    }

    function cancelar() {
        MySwal.close()
        MySwal.fire({
            icon: "info",
            title: "Ação cancelada",
            showConfirmButton: false,
            timer: 1500
        })
    }

    function adicionandoProduto() {
        MySwal.fire({
            title: <h2 className="bg-a-claro text-3xl md:text-4xl font-text text-a-agua text-outline-3 h-12 items-center flex justify-center rounded-2xl border">Adicionar Produto</h2>,

            html: (
                <form onSubmit={handleSubmit(adicionarProduto)} className="bg-a-claro flex flex-col justify-evenly gap-8 p-4 rounded-2xl border">
                    <p className="flex flex-col w-full gap-4">
                        <label htmlFor="nome" className="font-text text-a-agua text-outline-2 text-xl">Nome do produto</label>
                        <input type="text" id="nome" 
                        className="bg-a-agua rounded-2xl border p-2 text-white"
                        {...register("nome")} />
                    </p>

                    <p className="flex flex-col w-full gap-4">
                        <label htmlFor="categoria" className="font-text text-a-agua text-outline-2 text-xl">Cat. do produto</label>
                        <input type="text" id="categoria" 
                        className="bg-a-agua rounded-2xl border p-2 text-white" 
                        {...register("categoria")} />
                    </p>

                    <p className="flex flex-col w-full gap-4">
                        <label htmlFor="preco" className="font-text text-a-agua text-outline-2 text-xl">Preço do produto</label>
                        <input type="text" id="preco" 
                        className="bg-a-agua rounded-2xl border p-2 text-white" 
                        {...register("preco")} />
                    </p>

                    <p className="flex flex-col w-full gap-4">
                        <label htmlFor="img" className="font-text text-a-agua text-outline-2 text-xl">URL da Imagem</label>
                        <input type="text" id="img" 
                        className="bg-a-agua rounded-2xl border p-2 text-white" 
                        {...register("img")} />
                    </p>

                    <div className="flex gap-8 items-center justify-evenly">
                        <button type="submit" className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-1xl md:text-3xl text-a-agua text-outline-3">Atualizar</button>
                        <button onClick={cancelar} className="border border-white rounded-lg bg-red-600 px-3 py-2 font-text text-1xl md:text-3xl text-a-agua text-outline-3">Cancelar</button>
                    </div>
                </form>
            ),
            showConfirmButton: false
        })
    }

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

    return (
        <>
            <Header />

            <main className="bg-a-claro flex flex-col items-center gap-12 p-8">

                <div className="flex flex-col md:flex-row justify-around items-center gap-10 md:gap-20">
                    <button onClick={adicionandoProduto} className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50 cursor-pointer w-50">Adicionar produtos</button>
                    <button onClick={pesquisandoProduto} className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50 cursor-pointer w-50">Pesquisar produtos</button>
                </div>

                <div className='bg-a-agua flex flex-wrap justify-center gap-8 p-5 w-full md:max-w-4xl max-h-150 xl:max-h-148 xl:h-150 overflow-auto rounded-lg'>
                    {listarProdutos}
                </div>

            </main>

            <Footer />
        </>
    )
}

export default AtualizarLoja;