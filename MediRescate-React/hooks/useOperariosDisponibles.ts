import { useTcpSocket } from "@/core/actions/core.action";
import { NombreOperario } from "@/types/types";
import { useEffect, useState } from "react";

interface ArrayOperarios {
  users: NombreOperario[];
}

export const useOperariosDisponibles = () => {
  const { enviarPeticion, response, error, loading } =
    useTcpSocket<ArrayOperarios>();

  const [operarios, setOperarios] = useState<NombreOperario[]>([]);

  const solicitarOperarios = () => {
    enviarPeticion("6", { estado: "libre" });
  };

  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        setOperarios(response.data.users);
      }
    }
  }, [response]);

  useEffect(() => {
    console.log("Contenido de array operarios: ", operarios);
  }, [operarios]);

  return {
    solicitarOperarios,

    operarios,
  };
};
