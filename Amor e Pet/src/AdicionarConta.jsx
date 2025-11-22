import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdicionarConta() {
    const [contas, setContas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const contaSalva = JSON.parse(localStorage.getItem('contasRecentes')) || [];
        if (contaSalva.length === 0) {
            navigate('/login'); // Redireciona para a tela de login se não houver contas
        } else {
            setContas(contaSalva); // Define as contas salvas no estado
        }
    }, []);

    const handleSelecionarConta = (email) => {
        navigate(`/login?email=${encodeURIComponent(email)}`);
    };

    const handleRemoverConta = (e, email) => {
        e.stopPropagation();
        const novasContas = contas.filter(c => c.email !== email);
        setContas(novasContas);
        localStorage.setItem('contasRecentes', JSON.stringify(novasContas));
        
        // Se remover todas, redireciona
        if (novasContas.length === 0) {
            navigate('/login');
        }
    };

    return (
        <>
            <header className="flex items-center justify-center bg-a-agua h-24 shadow-md shadow-black/30">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/Logo.png" alt="Amor e Pet" className="w-12 h-12  md:w-16 md:h-16" />
                    <h1 className="text-3xl text-outline-4 pr-4 text-a-agua font-logo tracking-tighter text-white drop-shadow-md">Amor & Pet</h1>
                </Link>
            </header>
            <main className="p-4 md:p-8 bg-a-claro min-h-[calc(100vh-6rem)] flex items-center justify-center">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold font-title text-a-escuro">
                            Escolha uma conta
                        </h2>
                        <p className="mt-2 text-lg font-text text-gray-600">
                            para prosseguir para o Amor e Pet
                        </p>
                    </div>

                    <ul className="divide-y divide-gray-200">
                        {contas.map((conta) => (
                            <li
                                key={conta.email}
                                onClick={() => handleSelecionarConta(conta.email)}
                                className="py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors rounded-lg px-2 group"
                            >
                                <div className="flex items-center">
                                    <img
                                        className="h-12 w-12 rounded-full object-cover border-2 border-a-agua"
                                        src={conta.img ? `/img/${conta.img}` : "https://via.placeholder.com/40"}
                                        alt={conta.nome}
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/40" }}
                                    />
                                    <div className="ml-3">
                                        <p className="text-lg font-bold font-text text-a-escuro">{conta.nome}</p>
                                        <p className="text-sm font-text text-gray-500">{conta.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => handleRemoverConta(e, conta.email)}
                                    className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                                    title="Remover conta"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </li>
                        ))}

                        <li className="mt-4 pt-4 border-t border-gray-100">
                            <Link 
                                to="/login" 
                                className="flex items-center cursor-pointer hover:bg-gray-50 transition-colors rounded-lg p-2 w-full group"
                            >
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-a-agua group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-lg font-medium font-text text-a-escuro group-hover:text-a-agua transition-colors">Usar outra conta</p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    );
}