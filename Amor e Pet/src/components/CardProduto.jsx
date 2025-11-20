

function CardProduto({ produto, setProdutos }) {

    return (
        <div className="flex flex-col items-center gap-4 rounded-sm bg-a-claro w-90 md:w-80 pb-4">
            <img src={produto.img} alt="Imagem do produto" className="w-full md:h-80 rounded-t-sm" />
            <div className="flex flex-col items-start gap-2 px-4">
                <h3 className="text-3xl font-text text-a-agua text-outline-2">{produto.nome}</h3>
                <p className="text-xl font-text text-a-agua text-outline-2">{produto.categorias}</p>
                <p className="text-xl font-text text-a-agua text-outline-2">R$ {produto.preco}</p>
            </div>
            <button className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-xs md:text-xl text-a-agua text-outline-3">Adicionar ao carrinho</button>
        </div>
    )
}

export default CardProduto