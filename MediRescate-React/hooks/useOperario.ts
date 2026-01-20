import { useEffect, useState } from "react";

export const useOperario = () => {
  const [estado, setEstado] = useState("ocupado"); // El valor inicial es el que llegue de la base de datos. Los nombres de los estados se pueden retocar en el useEffect

  const cambioEstado = (valor: string) => {
    setEstado(valor);
  };

  const [color, setColor] = useState("bg-red-600");

  useEffect(() => {
    // En los cases hay que cambiar los nombres por los que lleguen de la base de datos
    // NOTE: Solo devuelven el final de la string para poder implementarlo con bg y borders
    switch (estado) {
      case "ocupado":
        setColor("-red-600");
        break;
      case "camino":
        setColor("-orange-500");
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
