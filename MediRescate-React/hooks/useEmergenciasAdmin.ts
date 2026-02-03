import { useTcpSocket } from "@/core/actions/core.action";
import { EmergenciaAdmin } from "@/types/types"; // Importamos el tipo correcto
import { useEffect, useState } from "react";

// Definimos la interfaz basada en el nuevo tipo
interface RespuestaEmergencias {
  emergencias: EmergenciaAdmin[];
}

export const useEmergenciasAdmin = () => {
  // Inicializamos el socket con el genérico de EmergenciaAdmin
  const { enviarPeticion, response, error, loading } =
    useTcpSocket<RespuestaEmergencias>();

  const [listaEmergencias, setListaEmergencias] = useState<EmergenciaAdmin[]>(
    [],
  );

  // Petición con código "8" y cuerpo vacío
  const solicitarEmergenciasAdmin = () => {
    enviarPeticion("8", {});
  };

  useEffect(() => {
    if (response) {
      if (response.status === "success") {
        // Asignamos el array de EmergenciaAdmin al estado
        setListaEmergencias(response.data.emergencias);
      }
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      console.error("Error al obtener emergencias admin:", error);
    }
  }, [error]);

  return {
    solicitarEmergenciasAdmin,
    listaEmergencias,
    loading,
    error,
  };
};
