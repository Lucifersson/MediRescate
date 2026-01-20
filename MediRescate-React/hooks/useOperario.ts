import { useEffect, useState } from "react";
import { Operario } from "@/types/types";

interface Props {
  operario?: Operario | null;
}

export const useOperario = ({ operario = null }: Props = {}) => {
  const [estado, setEstado] = useState(operario?.estado ?? null); // El valor inicial es el que llegue de la base de datos. Los nombres de los estados se pueden retocar en el useEffect

  const cambioEstado = (valor: string) => {
    setEstado(valor);
  };

  const [color, setColor] = useState("bg-red-600");

  useEffect(() => {
    // En los cases hay que cambiar los nombres por los que lleguen de la base de datos
    // NOTE: Solo devuelven el final de la string para poder implementarlo con bg y borders
    switch (estado) {
      case "ocupado":
        setColor("-red-600");
        break;
      case "camino":
        setColor("-orange-500");
        break;
      case "libre":
        setColor("-green-600");
        break;
      default: // Caso de estar libre
        setColor("-green-600");
        break;
    }
  }, [estado]);

  return {
    estado,
    color,

    cambioEstado,
  };
};
