import { useTcpSocket } from "@/core/actions/core.action";
import { useEffect, useState } from "react";

export const useRegistrarEmergencia = () => {
  const { enviarPeticion, response, error, loading } = useTcpSocket<any>();

  const [registroExitoso, setRegistroExitoso] = useState(false);

  const registrarEmergencia = (
    idOperario: number | string,
    descripcion: string,
    id_teleoperador: number | undefined,
  ) => {
    setRegistroExitoso(false);

    enviarPeticion("7", {
      id_operario: idOperario,
      descripcion: descripcion,
      teleoperador: id_teleoperador,
    });
  };

  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        setRegistroExitoso(true);
        console.log("Emergencia enviada correctamente al servidor.");
      }
    }
  }, [response]);

  return {
    registrarEmergencia,
    registroExitoso,
    loading,
    error,
  };
};
