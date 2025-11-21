import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const FORM_INICIAL = {
    data: '',
    hora: '',
    petId: '',
    profissionalId: '',
    servico: '',
    obs: ''
}

export default function NovoAgendamento() {
    const [formulario, setFormulario] = useState(FORM_INICIAL);
    const [usuario, setUsuario] = useState(null);
    const [pets, setPets] = useState([]);
    const [profissionais, setProfissionais] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const dadosUsuario = localStorage.getItem('usuarioLogado');
        if (!dadosUsuario) {
            setErro('Você precisa estar logado para agendar um serviço.');
            setCarregando(false);
            return;
        }
        const usuarioLogado = JSON.parse(dadosUsuario);
        setUsuario(usuarioLogado);

        async function carregarDados() {
            try {
                const [respostaPets, respostaProfissionais] = await Promise.all([
                    fetch(`${API_URL}/pets?usuarioId=${usuarioLogado.id}`),
                    fetch(`${API_URL}/profissionais`)
                ]);
                if (!respostaPets.ok || !respostaProfissionais.ok) {
                    throw new Error('Falha ao buscar dados necessários para o agendamento.');
                }
                const dadosPets = await respostaPets.json();
                const dadosProfissionais = await respostaProfissionais.json();
                setPets(dadosPets);
                setProfissionais(dadosProfissionais);
                setCarregando(false);
            } catch (error) {
                setErro(error.message || String(error));
                setCarregando(false);
            }
        }

        carregarDados();

    }, []);

    function handleChange(evento) {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    async function handleSubmit(evento) {
        evento.preventDefault();

        if (!formulario.petId || !formulario.profissionalId || !formulario.data || !formulario.hora) {
            setErro('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const petSelecionado = pets.find(p => p.id === parseInt(formulario.petId));
        const profissionalSelecionado = profissionais.find(p => p.id === parseInt(formulario.profissionalId));

        if (!petSelecionado || !profissionalSelecionado) {
            setErro('Selecione um pet e um profissional válidos.');
            return;
        }

        const novoAgendamento = {
            ...formulario,
            usuarioId: usuario.id,
            nomePet: petSelecionado.nome,
            nomeProfissional: profissionalSelecionado.nome,
            petId: parseInt(formulario.petId),
            profissionalId: parseInt(formulario.profissionalId)
        };

        try {
            const resposta = await fetch(`${API_URL}/agendamentos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoAgendamento)
            });

            if (!resposta.ok) {
                throw new Error('Não foi possível criar o agendamento. Tente novamente.');
            }

            setSucesso('Agendamento criado com sucesso! Redirecionando...');
            // Redireciona para a lista de agendamentos após 2 segundos
            setTimeout(() => {
                navigate('/agendamentos');
            }, 2000);

        } catch (error) {
            setErro(error.message || String(error));
        }

    }

    if (carregando) {
        return <p className="text-center p-8 font-text text-a-escuro">Carregando...</p>;
    }
    if (!usuario) {
        return (
            <div className="text-center p-8">
                <p className="font-text text-red-600">{erro}</p>
                <Link to="/login" className="mt-4 inline-block bg-a-escuro text-a-agua px-4 py-2 rounded-lg font-text">
                    Ir para o Login
                </Link>
            </div>
        );
    }

    return (
        <main className="p-4 md:p-8 bg-a-claro min-h-screen">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold font-title text-a-escuro text-center mb-8">Novo Agendamento</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Seleção de Pet */}
                    <div>
                        <label htmlFor="petId" className="block font-text text-lg text-a-escuro mb-2">Selecione o Pet *</label>
                        <select name="petId" id="petId" value={formulario.petId} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro">
                            <option value="">Selecione...</option>
                            {pets.length > 0 ? (
                                pets.map(pet => <option key={pet.id} value={pet.id}>{pet.nome}</option>)
                            ) : (
                                <option disabled>Você não tem pets cadastrados.</option>
                            )}
                        </select>
                    </div>

                    {/* Seleção de Serviço */}
                    <div>
                        <label htmlFor="servico" className="block font-text text-lg text-a-escuro mb-2">Serviço *</label>
                        <select name="servico" id="servico" value={formulario.servico} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro">
                            <option value="">Selecione...</option>
                            <option value="Banho e Tosa">Banho e Tosa</option>
                            <option value="Consulta Veterinária">Consulta Veterinária</option>
                            <option value="Vacinação">Vacinação</option>
                        </select>
                    </div>

                    {/* Seleção de Profissional */}
                    <div>
                        <label htmlFor="profissionalId" className="block font-text text-lg text-a-escuro mb-2">Profissional *</label>
                        <select name="profissionalId" id="profissionalId" value={formulario.profissionalId} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro">
                            <option value="">Selecione...</option>
                            {profissionais.map(prof => <option key={prof.id} value={prof.id}>{prof.nome} - {prof.especialidade}</option>)}
                        </select>
                    </div>

                    {/* Seleção de Data e Hora */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="data" className="block font-text text-lg text-a-escuro mb-2">Data *</label>
                            <input type="date" name="data" id="data" value={formulario.data} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro" />
                        </div>
                        <div>
                            <label htmlFor="hora" className="block font-text text-lg text-a-escuro mb-2">Hora *</label>
                            <input type="time" name="hora" id="hora" value={formulario.hora} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro" />
                        </div>
                    </div>

                    {/* Observações */}
                    <div>
                        <label htmlFor="obs" className="block font-text text-lg text-a-escuro mb-2">Observações</label>
                        <textarea name="obs" id="obs" value={formulario.obs} onChange={handleChange} rows="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro" placeholder="Ex: Meu pet tem alergia a certos produtos..."></textarea>
                    </div>

                    {/* Botão de Envio e Mensagens */}
                    <div className="text-center">
                        {erro && <p className="text-red-600 mb-4">{erro}</p>}
                        {sucesso && <p className="text-green-600 mb-4">{sucesso}</p>}
                        <button type="submit" className="w-full bg-a-escuro text-a-agua font-bold text-xl py-3 rounded-lg hover:bg-opacity-90 transition-colors">
                            Agendar
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}






