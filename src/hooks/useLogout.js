import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutAll } from "../api/usuario.api";

// Custom hook para manejar el logout
const useLogout = () => {
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logoutAll,
    onSuccess: () => {
      console.log("Sesión cerrada");
      localStorage.removeItem("Token");
      localStorage.removeItem("id_usuario");
      //id tienda
      localStorage.setItem("sessionClosed", "true");
      navigate("/");
    },
    onError: (error) => {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión");
    },
  });

  return logoutMutation.mutate;  // Retornamos solo la función mutate
};

export default useLogout;