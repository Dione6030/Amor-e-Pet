import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export default function Agendamentos(){
    const [agendamentos, setAgendamentos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        const dadosUsuario = localStorage.getItem('usuarioLogado');
        let usuarioLogado = null;

        try {
            // Garante que 'dadosUsuario' não é nulo, indefinido ou uma string vazia antes de tentar o parse
            if (dadosUsuario && dadosUsuario !== 'undefined') {
                usuarioLogado = JSON.parse(dadosUsuario);
                setUsuario(usuarioLogado);
            }
        } catch (e) {
            console.error("Erro ao parsear dados do usuário:", e);
            setErro('Houve um problema ao carregar seus dados. Tente fazer login novamente.');
            setCarregando(false);
            return;
        }

        if (!usuarioLogado) {
            setErro('Você precisa estar logado para ver seus agendamentos.');
            setCarregando(false);
            return;
        }

        async function buscarAgendamentos() {
            try {
                const resposta = await fetch(`${API_URL}/agendamentos?usuarioId=${usuarioLogado.id}`);
                if (!resposta.ok) {
                    throw new Error('Falha ao buscar os agendamentos.');
                }
                const dados = await resposta.json();
                setAgendamentos(dados);
            } catch (error) {
                setErro(error.message);
            } finally {
                setCarregando(false);
            }
        }

        buscarAgendamentos();
    }, []);

    if(carregando){
        return <p className="text-center p-8 font-text text-a-escuro">Carregando agendamentos...</p>;
    }

    if(erro){
        return(
         <div className="text-center p-8">
                <p className="font-text text-red-600">{erro}</p>
                {/* Se o erro for por não estar logado, oferece o link para o login */}
                {!usuario && (
                    <Link to="/login" className="mt-4 inline-block bg-a-escuro text-a-agua px-4 py-2 rounded-lg font-text">
                        Ir para o Login
                    </Link>
                )}
            </div>
        )
    }
    return(
        <main className="p-4 md:p-8 bg-a-claro min-h-screen">
            <h1 className="text-4xl font-bold font-title text-a-escuro text-center mb-8">Meus Agendamentos</h1>

            {/* Se não houver agendamentos, mostra uma mensagem amigável */}
            {agendamentos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto border border-gray-100">
                    <div className="bg-a-claro p-6 rounded-full mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-a-escuro" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-title text-a-escuro mb-3 text-center">Nenhum agendamento por aqui</h2>
                    <p className="font-text text-gray-600 text-center max-w-md mb-8 text-lg">
                        Seu histórico está vazio. Que tal agendar um momento especial de cuidado para o seu pet?
                    </p>
                    <Link 
                        to="/novo-agendamento" 
                        className="bg-a-agua text-a-escuro font-bold text-lg py-3 px-8 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                        <span>📅</span> Fazer Agendamento
                    </Link>
                </div>
            ) : (
                // Se houver agendamentos, mapeia e exibe cada um deles.
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {agendamentos.map((agendamento) => (
                        <div key={agendamento.id} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-a-escuro">
                            <h2 className="text-2xl font-bold font-title text-a-escuro">{agendamento.servico}</h2>
                            <p className="font-text text-gray-600 mt-2">
                                <strong>Pet:</strong> {agendamento.nomePet}
                            </p>
                            <p className="font-text text-gray-600">
                                <strong>Profissional:</strong> {agendamento.nomeProfissional}
                            </p>
                            <p className="font-text text-gray-800 mt-4 text-lg">
                                <strong>Data:</strong> {new Date(agendamento.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                            </p>
                            <p className="font-text text-gray-800 text-lg">
                                <strong>Hora:</strong> {agendamento.hora}
                            </p>
                            {agendamento.obs && (
                                <p className="font-text text-sm text-gray-500 mt-4 bg-gray-100 p-2 rounded">
                                    <strong>Observações:</strong> {agendamento.obs}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}