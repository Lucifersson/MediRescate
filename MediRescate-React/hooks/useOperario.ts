import { useEffect, useState } from "react";
import { EstadoOperario, Operario } from "@/types/types";
import { useTcpSocket } from "@/core/actions/core.action";

interface Props {
  operario: Operario | null;
}

//NOTE: se asume que operario no puede ser null por ningun motivo
export const useOperario = ({ operario }: Props) => {
  console.log("Estado operario al cargar useOperario ", operario);
  const [estado, setEstado] = useState(operario?.estado); // El valor inicial es el que llegue de la base de datos. Los nombres de los estados se pueden retocar en el useEffect

  const { enviarPeticion, response, error, loading } =
    useTcpSocket<EstadoOperario>();

  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        setEstado(response.data.newState);
      }
    }
  }, [response]);

  //TODO: implementar mensajes de error

  const cambioEstado = (valor: string) => {
    enviarPeticion("5", {
      id_operario: operario?.idUsuario,
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
