import { useEffect, useState } from "react";
import { EstadoOperario, Operario } from "@/types/types";
import { useTcpSocket } from "@/core/actions/core.action";

interface Props {
  operario: Operario | null;
}

export const useOperario = ({ operario }: Props) => {
  console.log("Estado operario al cargar useOperario ", operario);
  const [estado, setEstado] = useState(operario?.estado);
  const { enviarPeticion, response, error, loading } =
    useTcpSocket<EstadoOperario>();

  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        setEstado(response.data.newState);
      }
    }
  }, [response]);

  // Manejo de errores
  useEffect(() => {
    if (error) {
      console.error("Error en la petición:", error);
    }
  }, [error]);

  const cambioEstado = (valor: string) => {
    enviarPeticion("5", {
      id_operario: operario?.idUsuario,
      prevState: estado,
      newState: valor,
    });
  };

  const [color, setColor] = useState("bg-red-600");
  useEffect(() => {
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
      default:
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
