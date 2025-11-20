import { useState } from "react";
import { Link } from "react-router";
import Header from "./components/Header";


export default function Login() {
 const [email, setEmail] = useState("");
 const [senha, setSenha] = useState("");
 const [erro, setErro] = useState("");


    return (
        <>
      <header className="flex items-center  justify-center bg-a-agua h-24 shadow-md shadow-black/30">
        <h1 className="font-logo">Amor&Pet</h1>
      </header>
      <main>
        <section>
            <div className="flex flex-col items-center justify-center bg-a-claro h-screen">
                
                
                <div className="h-[40rem] w-[20rem] bg-a-escuro flex flex-col ">
                    <h2 className="text-center pt-10 font-text text-white " >Login</h2>
                    <form className="flex flex-col gap-28" action="">
                       <input type="email" placeholder="Email" className="mt-20 ml-10 w-60 h-10 rounded-lg bg-white "/>
                       <input type="password" placeholder="Senha" className="ml-10 w-60 h-10 rounded-lg bg-white "/>
                       <button className="ml-10 w-60 h-10 bg-a-agua text-a-escuro font-bold rounded-lg">Login</button>

                    </form>
                       <p className="text-center pt-10 text-white hover: text-black; pointer"><a href="">Regitrar-se</a></p>
                    
                </div>

            </div>
        </section>
      </main>
        
        
        </>
    )
}