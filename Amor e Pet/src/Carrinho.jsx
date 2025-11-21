import Header from "./components/Header"
import Footer from "./components/Footer"
import { useState } from "react";
import CardCarrinho from "./components/CardCarrinho";

function Carrinho() {
    const [produtosCarrinho] = useState(() => {
        try {
            const raw = localStorage.getItem('usuarioLogado');
            if (!raw) return [];
            const usuario = JSON.parse(raw);
            const carrinhoKey = `carrinho_${usuario.id}`;
            const carrinhoRaw = localStorage.getItem(carrinhoKey);
            return carrinhoRaw ? JSON.parse(carrinhoRaw) : [];
        } catch (e) {
            console.log('Erro ao carregar carrinho:', e.message);
            return [];
        }
    });

    const listarProdutos = produtosCarrinho.map(produto => (
        <CardCarrinho key={produto.id} produto={produto} />
    ))

    function RemoverTudo() {
        try {
            const raw = localStorage.getItem('usuarioLogado');
            if (!raw) return;
            const usuario = JSON.parse(raw);
            const carrinhoKey = `carrinho_${usuario.id}`;
            localStorage.removeItem(carrinhoKey);
            const usuarioAtualizado = { ...usuario, idprodutosnocarrinho: [] };
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado));
            window.location.reload();
        } catch (e) {
            console.log('Erro ao remover todos os produtos do carrinho:', e.message);
        }
    }

    return (
        <>
        <Header />

        <main className="flex flex-col md:flex-row justify-evenly items-center md:items-start p-8 bg-a-claro gap-8">

            <div className="flex flex-col gap-6 p-8 bg-a-agua rounded-lg overflow-auto h-150 w-96 md:w-170 md:h-120 xl:h-180">
              {listarProdutos.length > 0 ? listarProdutos : (
                <p className="font-text text-a-agua text-outline-2 text-xl">Carrinho vazio</p>
              )}
            </div>

            <div className="flex flex-col gap-4 md:gap-8">
                <button className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-2xl text-a-agua text-outline-3 hover:bg-a-escuro/90 active:scale-95 transition">Finalizar compra</button>
                <button onClick={RemoverTudo} className="border border-white rounded-lg bg-red-600 px-3 py-2 font-text text-2xl text-a-agua text-outline-3 hover:bg-red-600/90 active:scale-95 transition">Cancelar compra</button>
            </div>
        </main>

        <Footer />
        </>
    )
}

export default Carrinho;