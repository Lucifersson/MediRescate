export interface TestResponse {
  data: {
    nombres: string[];
  };
}

export interface Operario {
  nombre: string;
  cargo: string;
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
