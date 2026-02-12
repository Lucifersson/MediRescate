/**
 * ARCHIVO: types.ts
 * Propósito: Definición centralizada de modelos de datos y respuestas del servidor.
 * Importancia: Proporciona tipado estricto para las respuestas de los Sockets TCP,
 * permitiendo que TypeScript valide la estructura de los datos en toda la aplicación.
 */

/**
 * ApiResponse<T>: Interfaz genérica para todas las respuestas del servidor.
 * @template T - El tipo de dato esperado en la propiedad 'data'.
 */
export interface ApiResponse<T> {
  status: "success" | "error"; // Discrimina el éxito o fallo de la operación
  data: T; // Contenido dinámico según el código de petición enviado
}

/**
 * Operario: Modelo detallado del usuario tras el login.
 * Utilizado para gestionar la sesión global en AuthContext.
 */
export interface Operario {
  cargo: "administrador" | "teleoperador" | "operario"; // Define la navegación por roles
  estado: string;
  idUsuario: number;
  nombre: string;
  password: string;
  ultimaConexion: string; // Formato string: "Jan 4, 2024..."
  user: string;
}

/**
 * OperariosAdmin: Modelo simplificado para las listas de supervisión.
 * Incluye la relación con la unidad móvil (ambulancia).
 */
export interface OperariosAdmin {
  id_operario: number;
  nombre: string;
  ambulancia: string;
  estado: string;
}

/**
 * EmergenciaAdmin: Estructura de incidencia para la vista de historial del administrador.
 */
export interface EmergenciaAdmin {
  id_operario: number;
  nombre_operario: string;
  descripcion: string;
}

/**
 * Emergencia: Estructura simplificada para el envío y recepción de alertas en tiempo real.
 */
export interface Emergencia {
  id: number;
  descripcion: string;
}

/**
 * EstadoOperario: Define los estados válidos de la máquina de estados del trabajador.
 */
export interface EstadoOperario {
  newState: "libre" | "ocupado" | "en_marcha";
}

/**
 * NombreOperario: Utilizado para selectores y pickers en el rol de Teleoperador.
 */
export interface NombreOperario {
  id_operario: number;
  nombre: string;
  longitud?: number;
  latitud?: number;
}

// --- INTERFACES DE PRUEBA Y LEGACY ---
export interface TestResponse {
  data: { nombres: string[] };
}

export interface OperariosResponse {
  data: Operario[];
}

export interface Response {
  status: string;
  data: string;
}
