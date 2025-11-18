import { Link } from 'react-router-dom'
import '../index.css'

export default function Header() {
    
    
    return (
        <>
        <header className="w-full p-2 flex items-center justify-center bg-a-agua">
            <nav className='flex items-center justify-between gap-12'>
                <Link to="/" className="flex items-center gap-2">
                    <img src="/Logo.png" alt="Amor e Pet" className="w-20 h-20" />
                    <h1 className="text-3xl text-outline-4 text-a-agua font-logo tracking-tighter">Amor & Pet</h1>
                </Link>
                <ul className="flex items-center justify-center gap-4">
                    <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3'>Home</Link>
                    <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3'>Agendamentos</Link>
                    <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3'>Meu Pet</Link>
                    <Link to="/" className='border border-white rounded-lg bg-a-escuro px-3 py-2 font-text text-3xl text-a-agua text-outline-3'>Login</Link>
                </ul>
                
            </nav>
        </header>
        </>
    )
}