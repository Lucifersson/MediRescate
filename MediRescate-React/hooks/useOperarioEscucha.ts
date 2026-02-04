import { useTcpSocket } from "@/core/actions/core.action";
import { Emergencia, OperariosAdmin } from "@/types/types";
import { useEffect, useState } from "react";

interface Props {
  id: number | undefined;
}

export const useOperariosEscucha = ({ id }: Props) => {
  const { enviarPeticion, response, error, loading } = useTcpSocket<Emergencia>(
    { altPort: true },
  );

  const [emergencia, setEmergencia] = useState<Emergencia>();

  const solicitarEmergencia = () => {
    enviarPeticion("200", { id: id });
    console.log("Escuchando ///////////////////////////////");
  };

  useEffect(() => {
    if (response) {
      console.log("MENSAJE RESPUESTA: ", response);
      if (response.status === "success") {
        console.log("REspuesta recibida: ", response.data);
        setEmergencia(response.data);
      }
    }
  }, [response]);

  useEffect(() => {
    console.log("Contenido de emergencia al llamar: ", emergencia);
  }, [emergencia]);

  return {
    solicitarEmergencia,

    emergencia,
  };
};
