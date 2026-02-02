import { useTcpSocket } from "@/core/actions/core.action";
import { OperariosAdmin } from "@/types/types";
import { useEffect, useState } from "react";

interface ArrayOperarios {
  users: OperariosAdmin[];
}

interface Props {
  id: number;
}

export const useOperariosEscucha = ({ id }: Props) => {
  const { enviarPeticion, response, error, loading } =
    useTcpSocket<ArrayOperarios>({ altPort: true });

  const [emergencia, setEmergencia] = useState<OperariosAdmin[]>([]);

  const solicitarOperariosTodos = () => {
    enviarPeticion("200", { id: id });
  };

  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        setEmergencia(response.data.users);
      }
    }
  }, [response]);

  useEffect(() => {
    console.log("Contenido de array operarios: ", emergencia);
  }, [emergencia]);

  return {
    solicitarOperariosTodos,

    emergencia,
  };
};
