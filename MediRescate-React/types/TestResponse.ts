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
