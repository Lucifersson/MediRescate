import { Operario } from "@/types/types"
import { useState } from "react"

export const useTeleoperador = () => {

    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [operario, setOperario] = useState<Operario>()


    const onPressButton = (titulo: string, descripcion: string, operario: Operario) => {
        setTitulo(titulo);
        setDescripcion(descripcion);
        setOperario(operario)
    }

    

    return {
        onPressButton
    }
}