import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function CardProduto({ produto }) {
    function adicionarNoCarrinho() {
        try {
            const raw = localStorage.getItem("usuarioLogado");
            const usuario = raw ? JSON.parse(raw) : null;
            if (!usuario) {
                Swal.fire({
                    title: <h2 className="text-a-agua font-text text-outline-3">Você precisa estar logado</h2>,
                    icon: "info",
                    html: <Link to="/Login" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-xl md:text-2xl text-a-agua text-outline-3'>Ir para Login</Link>,
                    confirmButtonText: "Fechar"
                });
                return;
            }

            const carrinhoAtual = Array.isArray(usuario.idprodutosnocarrinho) ? usuario.idprodutosnocarrinho : [];
            if (carrinhoAtual.includes(produto.id)) {
                Swal.fire({
                    title: <h2 className="text-a-agua font-text text-outline-3">Produto já está no carrinho</h2>,
                    icon: "info",
                    timer: 1800,
                    showConfirmButton: false
                });
                return;
            }

            const atualizado = [...carrinhoAtual, produto.id];
            const usuarioAtualizado = { ...usuario, idprodutosnocarrinho: atualizado };
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));

            Swal.fire({
                title: <h2 className="text-a-agua font-text text-outline-3">Adicionado!</h2>,
                text: `${produto.nome} foi incluído no carrinho`,
                icon: "success",
                timer: 1800,
                showConfirmButton: false
            });
        } catch (erro) {
            console.error(erro);
            Swal.fire({
                title: "Erro",
                text: erro.message,
                icon: "error"
            });
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 rounded-sm bg-a-claro w-60 md:w-65 pb-4">
            <img src={produto.img} alt="Imagem do produto" className="w-full md:h-80 rounded-t-sm" />
            <div className="flex flex-col items-start gap-2 px-4">
                <h3 className="text-3xl font-text text-a-agua text-outline-2">{produto.nome}</h3>
                <p className="text-xl font-text text-a-agua text-outline-2">{produto.categorias}</p>
                <p className="text-xl font-text text-a-agua text-outline-2">R$ {produto.preco}</p>
            </div>
            <button onClick={adicionarNoCarrinho} className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-xs md:text-xl text-a-agua text-outline-3 hover:bg-a-escuro/90 active:scale-95 transition">Adicionar ao carrinho</button>
        </div>
    )
}

export default CardProduto