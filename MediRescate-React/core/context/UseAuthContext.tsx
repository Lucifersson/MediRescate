/**
 * CONTEXTO: AuthContext / AuthProvider
 * Propósito: Gestionar el estado global de la sesión del usuario.
 * Funcionalidad:
 * 1. Almacena los datos del usuario logueado (ID, Rol, Nombre).
 * 2. Provee métodos globales de Login y Logout.
 * 3. Gestiona la redirección automática al cerrar la sesión.
 */

import { Operario } from "@/types/types";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

// --- DEFINICIÓN DE INTERFACES ---
interface AuthContextProps {
  user: Operario | null; // Datos del usuario actual (o null si no hay sesión)
  login: (userData: Operario) => void; // Función para establecer el usuario tras el login
  logout: () => void; // Función para limpiar la sesión y redirigir
}

// Creación del contexto inicial
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

/**
 * COMPONENTE PROVIDER: AuthProvider
 * Debe envolver la raíz de la aplicación (normalmente en _layout.tsx) para que
 * todos los componentes tengan acceso al estado de autenticación.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Operario | null>(null);

  // Efecto de depuración para monitorizar cambios en el estado del usuario
  useEffect(() => {
    console.log("Valor idEmpleado al cargar AuthProvider", user?.idUsuario);
  }, [user]);

  /**
   * login: Actualiza el estado global con los datos recibidos del servidor.
   */
  const login = (userData: Operario) => setUser(userData);

  /**
   * logout: Limpia el estado del usuario y fuerza la navegación a la pantalla de Login.
   * NOTE: Se usa router.replace para evitar que el usuario pueda volver atrás
   * a una pantalla protegida mediante el botón físico del dispositivo.
   */
  const logout = () => {
    console.log("Cerrando sesion del usuario global.");
    setUser(null);
    router.replace("/(stack)/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * HOOK: useAuthContext
 * Acceso directo al contexto de autenticación.
 * Uso: const { user, logout } = useAuthContext();
 */
export const useAuthContext = () => useContext(AuthContext);
