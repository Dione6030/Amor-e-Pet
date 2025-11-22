import { Link } from 'react-router-dom'
import '../index.css'
import { useEffect, useRef, useState } from 'react'
import CardNotificacao from './CardNotificacao'
import Swal from 'sweetalert2'

export default function Header() {
    const [openMenu, setOpenMenu ] = useState(false)
    const [openNotifica, setOpenNotifica ] = useState(false)
    const [openPerfil, setOpenPerfil] = useState(false)
    const [notificacoes, setNotificacoes] = useState([])
    
    const menuRef = useRef(null)
    const notificaRef = useRef(null)
    const perfilRef = useRef(null)
    
    const [usuario, setUsuario] = useState(null)
    
    useEffect(() => {
        function load() {
            try {
                const raw = localStorage.getItem('usuarioLogado');
                if (raw) setUsuario(JSON.parse(raw));
                else setUsuario(null);
            } catch {
                setUsuario(null);
            }
        }

        load();
        function onStorage(e) {
            if (e.key === 'usuarioLogado') load();
        }
        window.addEventListener('storage', onStorage);

        function handleClickFora(e) {
            if (openMenu && menuRef.current && !menuRef.current.contains(e.target) && e.target.id !== 'dropdownButton') {
                setOpenMenu(false)
            }
            if (openNotifica && notificaRef.current && !notificaRef.current.contains(e.target) && e.target.id !== 'notificationButton') {
                setOpenNotifica(false)
            }
            if (openPerfil && perfilRef.current && !perfilRef.current.contains(e.target) && e.target.id !== 'profileButton') {
                setOpenPerfil(false)
            }
        }
        document.addEventListener('mousedown', handleClickFora)

        // cleanup ÚNICO
        return () => {
            window.removeEventListener('storage', onStorage)
            document.removeEventListener('mousedown', handleClickFora)
        }
    }, [openMenu, openNotifica, openPerfil])

    function logout() {
        localStorage.removeItem('usuarioLogado');
        setUsuario(null);
        setOpenMenu(false);
        setOpenPerfil(false);
    }

    function confirmarLogout() {
        setOpenPerfil(false);
        Swal.fire({
            title: 'Sair da conta?',
            text: "Você precisará fazer login novamente.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#295E98',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, sair',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                Swal.fire('Saiu!', 'Você foi desconectado.', 'success');
            }
        })
    }

    function abrirMenu() {
        setOpenMenu(prev => !prev)
    }

    function togglePerfil() {
        setOpenPerfil(prev => !prev)
        setOpenNotifica(false)
        setOpenMenu(false)
    }

    async function abrirNotificacoes() {
        setOpenNotifica(prev => {
            const next = !prev
            if (next) {
                buscarNotificacoes()
                setOpenPerfil(false)
            }
            return next
        })
    }

    async function buscarNotificacoes() {
        try{
            if (!usuario?.id) return
            // json-server: use query string
            const resposta = await fetch(`http://localhost:3000/notifica?usuarioId=${usuario.id}`)
            if(!resposta.ok) throw new Error('Erro na busca por notificações')
            const notificaDados = await resposta.json()
            setNotificacoes(notificaDados)
        } catch (error) {
            console.error("Erro:", error.message);
        }
    }

    return (
        <>
        <header className="w-full p-0.5 md:p-2 flex items-center justify-center bg-a-agua">
            <nav className='flex items-center justify-evenly md:justify-around gap-12'>
                <Link to="/" className="flex items-center gap-2">
                    <img src="/Logo.png" alt="Amor e Pet" className="w-12 h-12 md:w-20 md:h-20" />
                    <h1 className="w-40 md:w-auto text-xl md:text-3xl text-outline-4 text-a-agua font-logo tracking-tighter">Amor & Pet</h1>
                </Link>
                <ul className="items-center justify-center gap-4 hidden md:flex">
                    <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50'>Home</Link>
                    <Link to="/Agendamentos" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50'>Agendamentos</Link>
                    <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50'>Meu Pet</Link>

                    {usuario ? (
                        <button onClick={confirmarLogout} className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50 cursor-pointer'>Logout</button>
                    ) : (
                        <Link to="/Login" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3 drop-shadow-xl/50'>Login</Link>
                    )}

                </ul>

                {openMenu && (
                    <div ref={menuRef} id='dropdownMenu' className='md:hidden absolute w-full top-13 bg-a-agua shadow-lg z-10'>
                        <ul className='flex flex-col items-start p-4 gap-4'>
                            <Link to="/" onClick={() => setOpenMenu(false)} className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-2xl text-a-agua text-outline-3 drop-shadow-xl/50 w-full text-center'>Home</Link>
                            <Link to="/Agendamentos" onClick={() => setOpenMenu(false)} className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-2xl text-a-agua text-outline-3 drop-shadow-xl/50 w-full text-center'>Agendamentos</Link>
                            <Link to="/" onClick={() => setOpenMenu(false)} className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-2xl text-a-agua text-outline-3 drop-shadow-xl/50 w-full text-center'>Meu Pet</Link>
                            
                            {usuario ? (
                                <button onClick={confirmarLogout} className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-2xl text-a-agua text-outline-3 drop-shadow-xl/50 w-full text-center cursor-pointer'>Logout</button>
                            ) : (
                                <Link to="/Login" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-2xl text-a-agua text-outline-3 drop-shadow-xl/50 w-full text-center'>Login</Link>
                            )}
                        </ul>
                    </div>
                )}

                {openNotifica && (
                    <div ref={notificaRef} id='dropdownNotifications' className='absolute w-80 bg-a-agua top-15 md:top-20 shadow-lg z-10 right-4 md:right-20 p-4 rounded-md'>
                        <div className='flex flex-col items-center'>
                            <h2 className='text-xs md:text-2xl font-text text-outline-3 text-a-agua'>notificações:</h2>
                            <hr />
                            {notificacoes.length > 0 ? (
                                notificacoes.map(n => <CardNotificacao key={n.id} notificacao={n} /> )
                            ) : (
                                <p>Nenhuma notificação nova</p>
                            )}
                        </div>
                    </div>
                )}


                
                <div className='flex items-center justify-center gap-4'>
                    <button
                        id='dropdownButton'
                        aria-haspopup="true" 
                        aria-expanded={openMenu} 
                        aria-controls='dropdownMenu' 
                        className='block md:hidden cursor-pointer' 
                        onClick={abrirMenu}
                    >
                        <img src="/Menu Cel.png" alt="Menu" />
                    </button>
                    
                    {usuario ? (
                        <div className="relative">
                            <button 
                                id="profileButton"
                                onClick={togglePerfil}
                                className="relative focus:outline-none"
                            >
                                <img 
                                    src={usuario.img ? `/${usuario.img}` : '/usuario.png'} 
                                    alt="Perfil" 
                                    className={`w-14 h-11 md:w-20 md:h-20 rounded-full object-cover border-2 transition-all duration-200 ${openPerfil ? 'border-a-escuro scale-105 shadow-lg' : 'border-white hover:border-gray-200'}`} 
                                />
                            </button>
                            
                            {openPerfil && (
                                <div ref={perfilRef} className="absolute top-full right-0 mt-2 z-30 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-fade-in-down">
                                    <div className="flex flex-col items-center p-6 bg-gray-50 border-b border-gray-100">
                                        <div className="relative">
                                            <img 
                                                src={usuario.img ? `/${usuario.img}` : '/usuario.png'} 
                                                alt="Perfil" 
                                                className='w-20 h-20 rounded-full object-cover border-4 border-white shadow-md mb-3' 
                                            />
                                        </div>
                                        <h3 className="font-title text-xl text-a-escuro">{usuario.nome || 'Cliente Amor&Pet'}</h3>
                                        <p className="font-text text-sm text-gray-500">{usuario.email}</p>
                                        
                                        <Link 
                                            to="/perfil-usuario" 
                                            onClick={() => setOpenPerfil(false)}
                                            className="mt-4 px-4 py-1.5 rounded-full border border-gray-300 text-sm font-text text-gray-700 hover:bg-gray-100 transition-colors inline-block"
                                        >
                                            Gerenciar sua Conta
                                        </Link>
                                    </div>

                                    <div className="p-2">
                                        
                                    <Link 
                                            to="/adicionarconta" 
                                            onClick={() => setOpenPerfil(false)}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                                        >
                                            <div className="bg-gray-100 p-2 rounded-full text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                </svg>
                                            </div>
                                            <span className="font-text text-gray-700 group-hover:text-blue-600 transition-colors duration-200">Adicionar outra conta</span>
                                        </Link>
                                        
                                        
                                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left group">
                                            <div className="bg-gray-100 p-2 rounded-full group-hover:bg-white transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <span className="font-text text-gray-700">Configurações</span>
                                        </button>
                                    </div>

                                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                                        <button 
                                            onClick={confirmarLogout}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all font-text text-gray-700 shadow-sm"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Sair da conta
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/Login"><img src="/Frame 4.png" alt=" Moldura de perfil" /></Link>
                    )}

                    <button
                        id='notificationButton'
                        aria-haspopup="true" 
                        aria-expanded={openNotifica} 
                        aria-controls='dropdownNotifications' 
                        className='cursor-pointer' 
                        onClick={ abrirNotificacoes }
                    >
                        <img src="/bxs_bell.png" alt="Notificações" />
                    </button>
                </div>
            </nav>
        </header>
        </>
    )
}