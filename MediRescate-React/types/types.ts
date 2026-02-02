export interface TestResponse {
  data: {
    nombres: string[];
  };
}

export interface Operario {
  cargo: "administrador" | "teleoperador" | "operario"; // Tipado estricto para tus rutas
  estado: string;
  idUsuario: number;
  nombre: string;
  password: string;
  ultimaConexion: string; // Viene como "Jan 4, 2024..."
  user: string;
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

//NOTE: este es el tipo
export interface NombreOperario {
  id_operario: number;
  nombre: string;
}

export interface OperariosAdmin {
  id_operario: number;
  nombre: string;
  estado: string;
  ambulancia: string;
}

export interface EmercgenciaAdmin {
  id_emergencia: number;
  emergencia: string;
  completado: boolean;
}
