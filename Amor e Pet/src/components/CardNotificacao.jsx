import { useEffect } from "react";

export default function CardNotificacao({ notificacao }) {
    const proficionalNome = notificacao?.proficionalNome || ""
    const proficionalImg = notificacao?.proficionalImg || ""
    const data = notificacao?.data || ""
    const hora = notificacao?.hora || ""
    const mensagem = notificacao?.mensagem || ""
    const vista = Boolean(notificacao?.vista)

    const imgSrc = (proficionalImg?.startsWith('http') || proficionalImg?.startsWith('/'))
        ? proficionalImg
        : `/${proficionalImg}`

    useEffect(() => {}, [notificacao]);

    return (
        <div className="flex items-center justify-evenly p-2 gap-3">
            <img src={imgSrc} alt="Imagem do profissional" className="w-12 h-12 rounded-full object-cover" />
            <div className="flex flex-col items-start gap-1">
                <h2 className="font-semibold">{proficionalNome}</h2>
                <h3>{mensagem}</h3>
                <p>{data} - {hora}</p>
                <p>{vista ? "Vista" : "Não Vista"}</p>
            </div>
        </div>
    );
}