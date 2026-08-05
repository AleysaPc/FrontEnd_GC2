import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { login } from "../../api/usuario.api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [showMessage, setShowMessage] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Usamos la función loginUser del AuthContext
  const { loginUser } = useContext(AuthContext);

  const submission = async (data) => {
    try {
      // Limpiar datos previos de sesión
      localStorage.removeItem("Token");
      localStorage.removeItem("id_usuario");
      localStorage.removeItem("sessionClosed");

      const response = await login(data.email, data.password);
      console.log("Inicio de sesión exitoso:", response.data);

      // 🔹 Llamamos al contexto para guardar usuario y token
      loginUser({
        token: response.data.token,
        id: response.data.user.id,
        full_name: response.data.user.full_name,
        email: response.data.user.email,
        rol: response.data.user.rol,
        lugar_de_trabajo: response.data.user.departamento, // Si lo devuelve el backend
        imagen: response.data.user.imagen, // Si lo devuelve el backend
      });

      setLoginSuccess(true);
      navigate(`/home`);
    } catch (error) {
      setShowMessage(true);
      console.error("Error durante el inicio de sesión", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-green-700 via-green-600 to-green-500">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        {/* Logo y nombre */}
        <div className="flex flex-col items-center mb-6">
          <img src="/LogoFed.PNG" alt="Logo de la Empresa" className="h-16 mb-2" />
          <h1 className="text-center text-xl font-bold bg-gradient-to-r from-red-800 via-red-800 to-red-800 text-transparent bg-clip-text">
            FEDERACIÓN DE TRABAJADORES LA PAZ
          </h1>
        </div>

        <h2 className="text-3xl text-center font-bold text-blue-600 mb-6">
          Iniciar sesión
        </h2>

        {showMessage && (
          <div className="mb-4 p-4 text-white bg-red-600 rounded-md">
            Error al iniciar sesión, inténtelo de nuevo o restablezca su contraseña.
          </div>
        )}

        {loginSuccess && (
          <div className="mb-4 p-4 text-white bg-green-600 rounded-md">
            ¡Sesión iniciada correctamente!
          </div>
        )}

        <form onSubmit={handleSubmit(submission)}>
          <div className="mb-4">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Email"
                  autoComplete="username"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
            />
          </div>

          <div className="mb-6">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/request/password_reset"
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña? Haz clic aquí
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
