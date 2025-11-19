import { useEffect } from "react";

export default function CardNotificacao({ notificacao }) {
    const proficionalNome = notificacao?.proficionalNome || ""
    const proficionalImg = notificacao?.proficionalImg || ""
    const data = notificacao?.data || ""
    const hora = notificacao?.hora || ""
    const mensagem = notificacao?.mensagem || ""
    const vista = notificacao?.vista || false

    useEffect(() => {

    }, [notificacao]);

    return (
        <div className="flex items-center justify-evenly">
            <img src={proficionalImg} alt="Imagem do profissional" />
            <div className="flex flex-col items-start gap-4">
                <h2>{proficionalNome}</h2>
                <h3>{mensagem}</h3>
                <p>{data} - {hora}</p>
                <p>{vista ? "Vista" : "Não Vista"}</p>
            </div>
        </div>
    );
}