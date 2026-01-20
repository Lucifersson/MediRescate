import { useEffect, useState } from "react";
import { EstadoOperario, Operario } from "@/types/types";
import { useTcpSocket } from "@/core/actions/core.action";

interface Props {
  operario?: Operario | null;
}

export const useOperario = ({ operario = null }: Props = {}) => {
  const [estado, setEstado] = useState(operario?.estado ?? null); // El valor inicial es el que llegue de la base de datos. Los nombres de los estados se pueden retocar en el useEffect

  const { enviarPeticion, response, error, loading } =
    useTcpSocket<EstadoOperario>();

  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        setEstado(response.data.newState);
      }
    }
  }, [response]);

  const cambioEstado = (valor: string) => {
    enviarPeticion("5", {
      id_empleado: operario?.idEmpleado,
      prevState: estado,
      newState: valor,
    });
  };

  const [color, setColor] = useState("bg-red-600");

  useEffect(() => {
    // En los cases hay que cambiar los nombres por los que lleguen de la base de datos
    // NOTE: Solo devuelven el final de la string para poder implementarlo con bg y borders
    switch (estado) {
      case "ocupado":
        setColor("-red-600");
        break;
      case "en_marcha":
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
