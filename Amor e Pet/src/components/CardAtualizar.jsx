import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

export default function CardAtualizar({ produto }) {
    const { register, handleSubmit } = useForm()

    async function atualizarProduto(data) {
        try {
            const resposta = await fetch(`http://localhost:3000/produtos/${produto.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: data.nome || produto.nome,
                    categorias: data.categoria || produto.categorias,
                    preco: data.preco || produto.preco,
                    img: data.img || produto.img
                })
            })
            if (!resposta.ok) throw new Error("Erro ao atualizar o produto")
            MySwal.fire({
                icon: "success",
                title: "Produto atualizado com sucesso!",
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
            title: "Atualização cancelada",
            showConfirmButton: false,
            timer: 1500
        })
    }

    function atualizandoProduto() {
        MySwal.fire({
            title: <h2 className="bg-a-claro text-3xl md:text-4xl font-text text-a-agua text-outline-3 h-12 items-center flex justify-center rounded-2xl border">Pesquisar Produto</h2>,

            html: (
                <form onSubmit={handleSubmit(atualizarProduto)} className="bg-a-claro flex flex-col justify-evenly gap-8 p-4 rounded-2xl border">
                    <p className="flex flex-col w-full gap-4">
                        <label htmlFor="nome" className="font-text text-a-agua text-outline-2 text-xl">Nome do produto</label>
                        <input type="text" id="nome" 
                        className="bg-a-agua rounded-2xl border p-2 text-white" 
                        placeholder={produto.nome}
                        {...register("nome")} />
                    </p>

                    <p className="flex flex-col w-full gap-4">
                        <label htmlFor="categoria" className="font-text text-a-agua text-outline-2 text-xl">Cat. do produto</label>
                        <input type="text" id="categoria" 
                        className="bg-a-agua rounded-2xl border p-2 text-white" 
                        placeholder={produto.categorias}
                        {...register("categoria")} />
                    </p>

                    <p className="flex flex-col w-full gap-4">
                        <label htmlFor="preco" className="font-text text-a-agua text-outline-2 text-xl">Preço do produto</label>
                        <input type="text" id="preco" 
                        className="bg-a-agua rounded-2xl border p-2 text-white" 
                        placeholder={produto.preco}
                        {...register("preco")} />
                    </p>

                    <p className="flex flex-col w-full gap-4">
                        <label htmlFor="img" className="font-text text-a-agua text-outline-2 text-xl">URL da Imagem</label>
                        <input type="text" id="img" 
                        className="bg-a-agua rounded-2xl border p-2 text-white" 
                        placeholder={produto.img}
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

    async function removerProduto() {
        MySwal.fire({
            title: 'Tem certeza que deseja remover este produto?',
            text: "Esta ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
        })
        try {
            const resposta = await fetch(`http://localhost:3000/produtos/${produto.id}`, {
                method: "DELETE"
            })
            if (!resposta.ok) throw new Error("Erro ao remover o produto")
            MySwal.fire({
                icon: "success",
                title: "Produto removido com sucesso!",
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.error("Error:", error.message)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 rounded-sm bg-a-claro w-60 md:w-65 pb-4 h-auto md:h-130">
            <img src={produto.img} alt="Imagem do produto" className="w-full md:h-80 rounded-t-sm" />
            <div className="flex flex-col items-start gap-2 px-4">
                <h3 className="text-3xl font-text text-a-agua text-outline-2">{produto.nome}</h3>
                <p className="text-xl font-text text-a-agua text-outline-2">{produto.categorias}</p>
                <p className="text-xl font-text text-a-agua text-outline-2">R$ {produto.preco}</p>
            </div>

            <div className="flex gap-4 mt-2">
                <button onClick={atualizandoProduto} className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-xs md:text-xl text-a-agua text-outline-3 hover:bg-a-escuro/90 active:scale-95 transition">Atualizar</button>
                <button onClick={removerProduto} className="border border-white rounded-lg bg-red-600 px-3 py-2 font-text text-xs md:text-xl text-a-agua text-outline-3 hover:bg-red-600/90 active:scale-95 transition">Remover</button>
            </div>
        </div>
    )
}