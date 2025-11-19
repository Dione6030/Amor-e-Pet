export default function Footer() {

    return (
        <>
            <footer className="flex flex-col md:flex-row md:items-center md:justify-evenly items-start justify-center w-full bg-a-agua p-4 gap-8 mt-8">
                <div className="flex flex-col items-start justify-between gap-2">
                    <p className="flex items-center gap-2 font-text text-xl text-a-agua text-outline-2">
                        <img src="./Vector.png" alt="Numero de Telefone" />
                        (53) 99933 6666
                    </p>
                    <p className="flex items-center gap-2 font-text text-xl text-a-agua text-outline-2">
                        <img src="./clarity_email-solid.png" alt="Email" />
                        suport@amorepet.com
                    </p>
                </div>
                <p className="text-center text-a-agua text-outline-2 text-xl">Copyright © Amor e Pet 2025</p>
                <div className="flex items-center gap-4">
                    <img src="./Vector (1).png" alt="Instagram" />
                    <img src="./Vector (2).png" alt="Facebook" />
                    <img src="./Vector (3).png" alt="WhatsApp" />
                </div>
            </footer>
        </>
    )
}