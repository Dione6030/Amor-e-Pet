

export default function CardCarrinho({ produto }) {

    return (

        <div className="flex flex-row items-center gap-4 rounded-sm bg-a-claro h-35 md:h-40">
            <img src={produto.img} alt="Imagem do produto" className="h-full rounded-t-sm" />
            <div className="flex flex-col items-start gap-2 px-4">
                <h3 className="text-xl md:text-3xl font-text text-a-agua text-outline-2">{produto.nome}</h3>
                <p className="text-xs md:text-xl font-text text-a-agua text-outline-2">R$ {produto.preco}</p>
                
                <div className="flex gap-2 md:gap-8 justify-evenly items-center">
                    <button className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-xs md:text-xl text-a-agua text-outline-3 hover:bg-a-escuro/90 active:scale-95 transition">Comprar</button>
                    <button className="border border-white rounded-lg bg-red-600 px-3 py-2 font-text text-xs md:text-xl text-a-agua text-outline-3 hover:bg-red-600/90 active:scale-95 transition">Remover</button>
                </div>
            </div>
        </div>

    )
}