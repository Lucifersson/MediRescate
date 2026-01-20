export interface TestResponse {
  data: {
    nombres: string[];
  };
}

export interface Operario {
  idEmpleado: number;
  nombre: string;
  cargo: "administrador" | "teleoperador" | "operario"; // Tipado estricto para tus rutas
  ultimaConexion: string; // Viene como "Jan 4, 2024..."
  user: string;
  password: string;
  estado: string | null;
}

export interface OperariosResponse {
  data: Operario[];
}

export interface Response {
  status: string;
  data: string;
}

export interface ApiResponse<T> {
  status: "success" | "error"; // Usar literales ayuda a TS a filtrar mejor
  data: T; // Aquí T puede ser string, Operario[], etc.
}

export interface EstadoOperario {
  newState: "libre" | "ocupado" | "en_marcha";
}
