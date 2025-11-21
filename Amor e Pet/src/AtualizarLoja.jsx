import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import CardAtualizar from "./components/CardAtualizar";


function AtualizarLoja() {
    const [ produtos, setProdutos ] = useState([])

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
        buscarProdutos();
    }, []);

    const listarProdutos = produtos.map((produto) => (
        <CardAtualizar key={produto.id} produto={produto} setProdutos={setProdutos} />
    ))

    return (
        <>
            <Header />

            <main className="bg-a-claro flex flex-col items-center gap-12 p-8">

                <div className="flex flex-col md:flex-row justify-around items-center gap-10 md:gap-20">
                    <button className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50 cursor-pointer w-50">Adicionar produtos</button>
                    <button className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50 cursor-pointer w-50">Pesquisar produtos</button>
                </div>

                <div className='bg-a-agua flex flex-wrap justify-center gap-8 p-5 w-full md:max-w-4xl max-h-150 xl:max-h-160 xl:h-160 overflow-auto rounded-lg'>
                    {listarProdutos}
                </div>

            </main>

            <Footer />
        </>
    )
}

export default AtualizarLoja;