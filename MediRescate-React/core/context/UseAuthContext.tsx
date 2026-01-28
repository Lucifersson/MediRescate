import { Operario } from "@/types/types";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: Operario | null;
  login: (userData: Operario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Operario | null>(null);

  useEffect(() => {
    console.log("Valor idEmpleado al cargar AuthProvider", user?.idUsuario);
  }, [user]);

  const login = (userData: Operario) => setUser(userData);
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

// Hook personalizado para usar el contexto fácilmente
export const useAuthContext = () => useContext(AuthContext);
