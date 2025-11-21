import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from './components/Header';
import Footer from './components/Footer';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export default function PerfilUsuario() {
    const [usuario, setUsuario] = useState({
        id: '',
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        endereco: '',
        cep: '',
        senha: '',
        img: ''
    });
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const dadosLocal = localStorage.getItem('usuarioLogado');
        if (dadosLocal) {
            const user = JSON.parse(dadosLocal);
            fetch(`${API_URL}/usuarios/${user.id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Falha ao buscar dados do usuário');
                    return res.json();
                })
                .then(data => {
                    setUsuario(data);
                })
                .catch(err => {
                    console.error('Erro ao buscar dados do usuário:', err);
                })
                .finally(() => {
                    setCarregando(false);
                });
        } else {
            setCarregando(false);
        }
    }, []);

    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setUsuario(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (evento) => {
        evento.preventDefault();
        try {
            const resposta = await fetch(`${API_URL}/usuarios/${usuario.id}`, {
                method: 'PUT', // PUT atualiza o registro inteiro
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuario)
            });

            if (resposta.ok) {
                const dadosAtualizados = await resposta.json();
                setUsuario(dadosAtualizados);
                localStorage.setItem('usuarioLogado', JSON.stringify(dadosAtualizados));

                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Seus dados foram atualizados.',
                    icon: 'success',
                    confirmButtonColor: '#41ACF5',
                    background: '#f0f9ff',
                    color: '#295E98'
                });
            } else {
                const erroTexto = await resposta.text();
                throw new Error(erroTexto || 'Falha ao atualizar os dados.');
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar seus dados.',
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    };

    if (carregando) {
        return (
            <div className="min-h-screen bg-a-claro flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-a-escuro"></div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-a-claro flex items-center justify-center py-10 px-4">
                <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-down">
                    
                    {/* Cabeçalho do Card */}
                    <div className="bg-a-agua p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 border-b-4 border-a-escuro/20">
                        <div className="relative group">
                            <img 
                                src={usuario.img ? `/${usuario.img}` : '/usuario.png'} 
                                alt="Foto de Perfil" 
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover transition-transform group-hover:scale-105" 
                            />
                            <div className="absolute bottom-2 right-2 bg-a-escuro p-2 rounded-full border-2 border-white shadow-md cursor-pointer hover:bg-white hover:text-a-escuro transition-colors text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-center md:text-left space-y-2">
                            <h1 className="font-logo text-3xl md:text-5xl text-white text-outline-4 drop-shadow-lg tracking-wide">
                                {usuario.nome || 'Meu Perfil'}
                            </h1>
                            <p className="font-text text-white/90 text-lg md:text-xl font-medium">
                                Gerencie suas informações pessoais e de acesso
                            </p>
                        </div>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        
                        <div className="space-y-2">
                            <label className="font-logo text-a-escuro text-lg ml-1">Nome Completo</label>
                            <input 
                                name="nome" 
                                value={usuario.nome || ''} 
                                onChange={handleChange} 
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 md:p-4 focus:border-a-agua focus:ring-0 outline-none transition-colors font-text text-gray-700 text-lg placeholder-gray-400"
                                placeholder="Digite seu nome"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-logo text-a-escuro text-lg ml-1">Email</label>
                            <input 
                                name="email" 
                                value={usuario.email || ''} 
                                onChange={handleChange} 
                                className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl p-3 md:p-4 font-text text-gray-500 text-lg cursor-not-allowed"
                                disabled
                                title="O email não pode ser alterado"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-logo text-a-escuro text-lg ml-1">CPF</label>
                            <input 
                                name="cpf" 
                                value={usuario.cpf || ''} 
                                onChange={handleChange} 
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 md:p-4 focus:border-a-agua focus:ring-0 outline-none transition-colors font-text text-gray-700 text-lg"
                                placeholder="000.000.000-00"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-logo text-a-escuro text-lg ml-1">Telefone</label>
                            <input 
                                name="telefone" 
                                value={usuario.telefone || ''} 
                                onChange={handleChange} 
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 md:p-4 focus:border-a-agua focus:ring-0 outline-none transition-colors font-text text-gray-700 text-lg"
                                placeholder="(00) 00000-0000"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="font-logo text-a-escuro text-lg ml-1">Endereço Completo</label>
                            <input 
                                name="endereco" 
                                value={usuario.endereco || ''} 
                                onChange={handleChange} 
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 md:p-4 focus:border-a-agua focus:ring-0 outline-none transition-colors font-text text-gray-700 text-lg"
                                placeholder="Rua, Número, Bairro, Cidade"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-logo text-a-escuro text-lg ml-1">CEP</label>
                            <input 
                                name="cep" 
                                value={usuario.cep || ''} 
                                onChange={handleChange} 
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 md:p-4 focus:border-a-agua focus:ring-0 outline-none transition-colors font-text text-gray-700 text-lg"
                                placeholder="00000-000"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="font-logo text-a-escuro text-lg ml-1">Senha</label>
                            <input 
                                name="senha" 
                                type="password" 
                                value={usuario.senha || ''} 
                                onChange={handleChange} 
                                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 md:p-4 focus:border-a-agua focus:ring-0 outline-none transition-colors font-text text-gray-700 text-lg"
                                placeholder="********"
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-end mt-6 pt-6 border-t border-gray-100">
                            <button 
                                type="submit" 
                                className="w-full md:w-auto bg-a-escuro text-a-agua font-logo text-xl px-8 py-4 rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all border-2 border-white text-outline-3 flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
