import { Operario } from "@/types/types"
import { useState } from "react"

export const useTeleoperador = () => {

    const [titulo, setTitulo] = useState("")
    const [operario, setOperario] = useState<Operario>()


    const onPressButton = (titulo: string,  operario: Operario) => {
        setTitulo(titulo);
        setOperario(operario)
    }

    

    return {
        onPressButton
    }
}