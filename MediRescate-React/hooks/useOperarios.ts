import { useTcpSocket } from "@/core/actions/core.action";
import { OperariosAdmin } from "@/types/types";
import { useEffect, useState } from "react";

interface ArrayOperarios {
  users: OperariosAdmin[];
}

export const useOperarios = () => {
  const { enviarPeticion, response, error, loading } =
    useTcpSocket<ArrayOperarios>();

  const [operarios, setOperarios] = useState<OperariosAdmin[]>([]);

  const solicitarOperariosTodos = () => {
    enviarPeticion("6", { estado: "NULL" });
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
    solicitarOperariosTodos,

    operarios,
  };
};
