import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const FORM_INICIAL = {
    nome: '',
    cpf: '',
    endereco: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cep: ''
};

export default function Cadastro() {
    const [formulario, setFormulario] = useState(FORM_INICIAL);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();

    function atualizarFormulario(evento) {
        const { name, value } = evento.target;
        setFormulario((anterior) => ({ ...anterior, [name]: value }));
    }

    function resetarFormulario() {
        setFormulario(FORM_INICIAL);
    }

    async function handleSubmit(evento) {
        evento.preventDefault();
        setErro('');
        setSucesso('');

        const obrigatorios = ['nome', 'cpf', 'endereco', 'email', 'cep', 'senha', 'confirmarSenha'];
        const faltando = obrigatorios.find((campo) => !formulario[campo]);
        if (faltando) {
            setErro('Preencha todos os campos obrigatórios.');
            return;
        }

        if (formulario.senha.length < 6) {
            setErro('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (formulario.senha !== formulario.confirmarSenha) {
            setErro('As senhas não conferem.');
            return;
        }

        try {
            setCarregando(true);

            const verificaEmail = await fetch(`${API_URL}/usuarios?email=${encodeURIComponent(formulario.email)}`);
            if (!verificaEmail.ok) throw new Error('Falha ao validar e-mail.');
            const duplicados = await verificaEmail.json();
            if (duplicados.length > 0) {
                setErro('Este e-mail já está cadastrado.');
                return;
            }

            const resposta = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: formulario.nome,
                    cpf: formulario.cpf,
                    endereco: formulario.endereco,
                    email: formulario.email,
                    senha: formulario.senha,
                    cep: formulario.cep,
                    papel: 'cliente'
                })
            });

            if (!resposta.ok) throw new Error('Não foi possível concluir o cadastro.');

            setSucesso('Cadastro realizado! Você será redirecionado para a página inicial.');
            resetarFormulario();
            setTimeout(() => navigate('/'), 1500);
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
                <img src="/Logo.png" alt="Amor e Pet" className="w-12 h-12 md:w-16 md:h-16" />
                <h1 className="text-3xl text-outline-4 pr-4 font-logo tracking-tighter text-white drop-shadow-md md:pr-6">Amor & Pet</h1>
            </Link>
        </header>
        <main className="p-4 md:p-8 bg-a-claro min-h-[calc(100vh-6rem)] flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-title text-a-escuro">Crie sua conta</h1>
                    <p className="text-lg font-text text-gray-600 mt-2">Preencha seus dados para acessar o Amor & Pet.</p>
                </header>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block font-text text-lg text-a-escuro mb-2">
                            Nome completo
                        </label>
                        <input
                            name="nome"
                            value={formulario.nome}
                            onChange={atualizarFormulario}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro outline-none transition-all"
                            placeholder="Maria Silva"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-text text-lg text-a-escuro mb-2">
                            CPF
                        </label>
                        <input
                            name="cpf"
                            value={formulario.cpf}
                            onChange={atualizarFormulario}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro outline-none transition-all"
                            placeholder="000.000.000-00"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-text text-lg text-a-escuro mb-2">
                            Endereço completo
                        </label>
                        <input
                            name="endereco"
                            value={formulario.endereco}
                            onChange={atualizarFormulario}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro outline-none transition-all"
                            placeholder="Rua, número, bairro, cidade"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-text text-lg text-a-escuro mb-2">
                            CEP
                        </label>
                        <input
                            name="cep"
                            value={formulario.cep}
                            onChange={atualizarFormulario}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro outline-none transition-all"
                            placeholder="00000-000"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-text text-lg text-a-escuro mb-2">
                            E-mail
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formulario.email}
                            onChange={atualizarFormulario}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro outline-none transition-all"
                            placeholder="cliente@email.com"
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-text text-lg text-a-escuro mb-2">
                                Senha
                            </label>
                            <input
                                type="password"
                                name="senha"
                                value={formulario.senha}
                                onChange={atualizarFormulario}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro outline-none transition-all"
                                placeholder="Mínimo 6 caracteres"
                                minLength={6}
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-text text-lg text-a-escuro mb-2">
                                Confirmar senha
                            </label>
                            <input
                                type="password"
                                name="confirmarSenha"
                                value={formulario.confirmarSenha}
                                onChange={atualizarFormulario}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-a-escuro outline-none transition-all"
                                minLength={6}
                                required
                            />
                        </div>
                    </div>

                    {erro ? <p className="text-center text-red-600 text-sm font-bold bg-red-50 p-2 rounded">{erro}</p> : null}
                    {sucesso ? <p className="text-center text-green-600 text-sm font-bold bg-green-50 p-2 rounded">{sucesso}</p> : null}

                    <button
                        type="submit"
                        className="w-full bg-a-escuro text-a-agua font-bold text-xl py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-70 shadow-md"
                        disabled={carregando}
                    >
                        {carregando ? 'Enviando...' : 'Cadastrar' }
                    </button>
                </form>
                <p className="text-center mt-8 font-text text-gray-600">
                    Já tem uma conta? <Link to="/Login" className="text-a-escuro font-bold hover:underline">Fazer Login</Link>
                </p>
            </div>
        </main>
        </>
    );
}