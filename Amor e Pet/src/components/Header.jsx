import { Link } from 'react-router-dom'
import '../index.css'
import { useEffect, useRef, useState } from 'react'
import CardNotificacao from './CardNotificacao'

export default function Header() {
    const [openMenu, setOpenMenu ] = useState(false)
    const [openNotifica, setOpenNotifica ] = useState(false)
    const [notificacoes, setNotificacoes] = useState([])
    const menuRef = useRef(null)
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
        return () => window.removeEventListener('storage', onStorage);


        function handleClickFora(e) {
            if (openMenu && menuRef.current && !menuRef.current.contains(e.target) && e.target.id !== 'dropdownButton') {
                setOpenMenu(false)
            }
            if (openNotifica && menuRef.current && !menuRef.current.contains(e.target) && e.target.id !== 'notificationButton') {
                setOpenNotifica(false)
            }
        }
        document.addEventListener('mousedown', handleClickFora)
        return () => {
            document.removeEventListener('mousedown', handleClickFora)
        }
    }, [openMenu])
    

    function abrirMenu() {
        setOpenMenu(prev => !prev)
    }

    function abrirNotificacoes() {
        setOpenNotifica(prev => !prev)
    }

    
    async function buscarNotificacoes() {
        try{
            const resposta = await fetch(`http://localhost:3000/notifica/usuarioId=${id}`);
            if(!resposta.ok) throw new Error('Erro na busca por notificações')
            const notificaDados = await resposta.json();

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
                    <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3'>Home</Link>
                    <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3'>Agendamentos</Link>
                    <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3'>Meu Pet</Link>
                    <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3'>Login</Link>
                </ul>

                {openMenu && 
                    (
                        <div ref={menuRef} children='dropdown' id='dropdown' className='md:hidden absolute w-full top-13 bg-a-agua shadow-lg z-10'>
                            <ul className='flex flex-col items-start p-4 gap-4'>
                                <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-2xl text-a-agua text-outline-3 w-full text-center'>Home</Link>
                                <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-2xl text-a-agua text-outline-3 w-full text-center'>Agendamentos</Link>
                                <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-2xl text-a-agua text-outline-3 w-full text-center'>Meu Pet</Link>
                                <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-2xl text-a-agua text-outline-3 w-full text-center'>Login</Link>
                            </ul>
                        </div>
                    )   
                }

                {openNotifica && (
                    <div ref={menuRef} children='dropdown' className='absolute w-80 bg-a-agua top-15 shadow-lg z-10 right-4'>
                        <div className='flex flex-col items-center'>
                            <h2 className='text-xs md:text-2xl font-text text-outline-3 text-a-agua'>notificações:</h2>
                            <hr />
                            {notificacoes.length > 0 ? (
                                notificacoes.map(notificacao => <CardNotificacao key={notificacao.id} notificacao={notificacao} /> )
                            ) : (
                                <p>Nenhuma notificação nova</p>
                            )}
                        </div>
                    </div>
                )}
                
                <div className='flex items-center justify-center gap-4'>
                    <button id='dropdownButton'
                    aria-haspopup="true" 
                    aria-expanded={openMenu} 
                    aria-controls='dropdown' 
                    className='block md:hidden cursor-pointer' 
                    onClick={abrirMenu}><img src="./Menu Cel.png" alt="Menu" /></button>
                    
                    {usuario ? (
                        <Link to="/"><img src="./Frame 4.png" alt="Foto de Perfil" />
                            <img src={usuario.imagem || '/Imagens de perfil1.png'} alt="Perfil" className='w-20 h-w-20 rounded-full object-cover border-2 border-white' />
                        </Link>
                    ) : (
                        <Link to="/"><img src="./Frame 4.png" alt="Foto de Perfil" /></Link>
                    )}

                    <button id='dropdownButton'
                    aria-haspopup="true" 
                    aria-expanded={openNotifica} 
                    aria-controls='dropdown' 
                    className='block md:hidden cursor-pointer' 
                    onClick={abrirNotificacao}><img src="./bxs_bell.png" alt="Foto de um sino" /></button>
                </div>
            </nav>
        </header>
        </>
    )
}