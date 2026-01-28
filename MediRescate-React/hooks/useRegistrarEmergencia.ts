import { useTcpSocket } from "@/core/actions/core.action";
import { ApiResponse } from "@/types/types"; // Importamos tu interfaz
import { useEffect, useState } from "react";

export const useRegistrarEmergencia = () => {
  // Usamos tu ApiResponse con un objeto vacío porque data: {}
  const { enviarPeticion, response, error, loading } = useTcpSocket<any>();

  const [registroExitoso, setRegistroExitoso] = useState(false);

  const registrarEmergencia = (
    idOperario: number | string,
    descripcion: string,
  ) => {
    setRegistroExitoso(false);

    // Enviamos el código 7 con los datos dinámicos
    enviarPeticion("7", {
      id_operario: idOperario,
      descripcion: descripcion,
    });
  };

  useEffect(() => {
    if (response) {
      // Usamos el literal "success" que definiste en tu interface
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
