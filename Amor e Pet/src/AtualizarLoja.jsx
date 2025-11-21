import Footer from "./components/Footer";
import Header from "./components/Header";
import { Link } from "react-router-dom";


function AtualizarLoja() {
    
    return (
        <>
            <Header />

            <main className="bg-a-claro flex flex-col items-center gap-12 p-8">

                <div className="flex flex-col md:flex-row justify-around items-center gap-10 md:gap-20">
                    <button className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50 cursor-pointer w-50">Adicionar produtos</button>
                    <button className="border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50 cursor-pointer w-50">Pesquisar produtos</button>
                </div>

            </main>

            <Footer />
        </>
    )
}

export default AtualizarLoja;