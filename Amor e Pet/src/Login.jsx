import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null); // Novo estado para usuário pré-selecionado
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Verifica se há um email passado na URL via query param (?email=...)
        const params = new URLSearchParams(location.search);
        const emailUrl = params.get('email');
        
        if (emailUrl) {
            setEmail(emailUrl);
            // Busca informações visuais da conta salva (se houver)
            const contasSalvas = JSON.parse(localStorage.getItem('contasRecentes')) || [];
            const conta = contasSalvas.find(c => c.email === emailUrl);
            if (conta) {
                setUsuarioSelecionado(conta);
            }
        } else {
            setUsuarioSelecionado(null);
            setEmail("");
        }
    }, [location]);

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

            // ATUALIZAÇÃO: Salva na lista de contas recentes para a tela AdicionarConta
            const contasSalvas = JSON.parse(localStorage.getItem('contasRecentes')) || [];
            // Remove a conta se já existir para evitar duplicatas e atualizar os dados
            const novasContas = contasSalvas.filter(c => c.email !== usuario.email);
            novasContas.push({
                nome: usuario.nome,
                email: usuario.email,
                img: usuario.img
            });
            localStorage.setItem('contasRecentes', JSON.stringify(novasContas));

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
                        <p className="text-lg font-text text-gray-600 mt-2">
                            {usuarioSelecionado ? `Olá, ${usuarioSelecionado.nome}!` : 'Bem-vindo de volta!'}
                        </p>
                    </header>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        {usuarioSelecionado ? (
                            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <img 
                                    src={usuarioSelecionado.img ? `/img/${usuarioSelecionado.img}` : "https://via.placeholder.com/80"} 
                                    alt={usuarioSelecionado.nome}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-a-agua mb-3 shadow-sm"
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/80" }}
                                />
                                <p className="font-text text-gray-500 text-sm mb-1">{usuarioSelecionado.email}</p>
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setUsuarioSelecionado(null);
                                        setEmail("");
                                        navigate('/login');
                                    }}
                                    className="text-sm text-a-escuro font-bold hover:underline"
                                >
                                    Não é você? Trocar conta
                                </button>
                            </div>
                        ) : (
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
                        )}

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
                                autoFocus={!!usuarioSelecionado}
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