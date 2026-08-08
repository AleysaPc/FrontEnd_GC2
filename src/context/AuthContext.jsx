import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("Token");
    if (!token) return null;

    // Recuperar rol como array (con fallback por si quedó string antiguo)
    let rol = localStorage.getItem("rol");
    try {
      rol = JSON.parse(rol);
    } catch {
      // Si era string simple (legado), conviértelo a array
      rol = rol ? [rol] : [];
    }

    return {
      id: localStorage.getItem("id_usuario"),
      full_name: localStorage.getItem("full_name"),
      email: localStorage.getItem("email"),
      rol, // ← ahora es array
      token,
      imagen: localStorage.getItem("imagen"),
    };
  });

  const loginUser = (userData) => {
    // Asegurar que rol sea array antes de guardar
    const rolArray = Array.isArray(userData.rol)
      ? userData.rol
      : [userData.rol];

    localStorage.setItem("Token", userData.token);
    localStorage.setItem("id_usuario", userData.id);
    localStorage.setItem("full_name", userData.full_name);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("rol", JSON.stringify(rolArray)); // ← JSON.stringify
    localStorage.setItem("id_departamento", userData.lugar_de_trabajo);
    localStorage.setItem("imagen", userData.imagen);

    setUser({
      id: userData.id,
      full_name: userData.full_name,
      email: userData.email,
      rol: rolArray, // ← array real
      token: userData.token,
      imagen: userData.imagen,
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
