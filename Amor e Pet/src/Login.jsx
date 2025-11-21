import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(evento) {
        evento.preventDefault();
        setErro('');
        setCarregando(true);

        if (!email || !senha) {
            setErro('Por favor, preencha o e-mail e a senha.');
            setCarregando(false);
            return;
        }

        try {
            const resposta = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            if (!resposta.ok) {
                const erroData = await resposta.json();
                throw new Error(erroData.message || 'Credenciais inválidas.');
            }

            const { usuario } = await resposta.json();
            
            // Salva o usuário no localStorage para manter a sessão
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

            // Redireciona para a página inicial
            navigate('/');

        } catch (error) {
            setErro(error.message);
        } finally {
            setCarregando(false);
        }
    }

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
                    <header className="text-center mb-8">
                        <h2 className="text-4xl font-bold font-title text-a-escuro">Login</h2>
                        <p className="text-lg font-text text-gray-600 mt-2">Bem-vindo de volta!</p>
                    </header>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block font-text text-lg text-a-escuro mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro outline-none transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block font-text text-lg text-a-escuro mb-2">
                                Senha
                            </label>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro outline-none transition-all"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        
                        {erro && <p className="text-center text-red-600 text-sm font-bold bg-red-50 p-2 rounded">{erro}</p>}

                        <button
                            type="submit"
                            className="w-full bg-a-escuro text-a-agua font-bold text-xl py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-70 shadow-md"
                            disabled={carregando}
                        >
                            {carregando ? 'Entrando...' : 'Login'}
                        </button>
                    </form>

                    <p className="text-center mt-8 font-text text-gray-600">
                        Ainda não tem conta? <Link to="/Cadastro" className="text-a-escuro font-bold hover:underline">Registrar-se</Link>
                    </p>
                </div>
            </main>
        </>
    );
}