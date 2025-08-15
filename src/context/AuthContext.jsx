import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("Token");
    if (!token) return null;
    return {
      id: localStorage.getItem("id_usuario"),
      fullName: localStorage.getItem("full_name"),
      email: localStorage.getItem("email"),
      rol: localStorage.getItem("rol"),
      token,
    };
  });

  // Ajuste aquí: se eliminó userData.user porque la respuesta tiene directamente los campos
  const loginUser = (userData) => {
    localStorage.setItem("Token", userData.token);
    localStorage.setItem("id_usuario", userData.id);
    localStorage.setItem("full_name", userData.full_name);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("rol", userData.rol);
    localStorage.setItem("id_departamento", userData.lugar_de_trabajo);

    setUser({
      id: userData.id,
      fullName: userData.full_name,
      email: userData.email,
      rol: userData.rol,
      token: userData.token,
    });
  };

  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const onStorageChange = () => {
      const token = localStorage.getItem("Token");
      if (!token) setUser(null);
    };

    const onSessionExpired = () => {
      logoutUser();
      toast.error("Tu sesión expiró. Por favor, inicia sesión de nuevo.", {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
      });
    };

    window.addEventListener("storage", onStorageChange);
    window.addEventListener("session-expired", onSessionExpired);

    return () => {
      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener("session-expired", onSessionExpired);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
