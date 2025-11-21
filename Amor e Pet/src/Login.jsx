import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// json-server padrão roda na porta 3000 (produtos já usam 3000). Ajuste fallback.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const USUARIOS_ENDPOINT = `${API_URL}/usuarios`;

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
            // Consulta usuarios filtrando por email e senha via query params do json-server
            const url = `${USUARIOS_ENDPOINT}?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`;
            const resposta = await fetch(url);
            if (!resposta.ok) throw new Error('Falha de comunicação com o servidor.');
            const lista = await resposta.json();

            if (!Array.isArray(lista) || lista.length === 0) {
                throw new Error('Credenciais inválidas.');
            }

            // Se houver mais de um, pega o primeiro (dados inconsistentes indicariam duplicidade)
            const usuario = lista[0];
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

            navigate('/');
        } catch (error) {
            // Network error (ex: servidor fora) cai aqui com message genérica do fetch
            if (error.message === 'Failed to fetch') {
                setErro('Não foi possível conectar ao servidor (verifique se o json-server está rodando na porta 3000).');
            } else {
                setErro(error.message);
            }
        } finally {
            setCarregando(false);
        }
    }

    return (
        <>
            <header className="flex items-center justify-center bg-a-agua h-24 shadow-md shadow-black/30">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/Logo.png" alt="Amor e Pet" className="w-12 h-12  md:w-16 md:h-16" />
                    <h1 className="text-3xl text-outline-4 pr-4 font-logo tracking-tighter text-white drop-shadow-md">Amor & Pet</h1>
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