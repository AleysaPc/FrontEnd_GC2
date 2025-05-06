import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { login } from "../../api/usuario.api"; // Ahora usando el método de api.Base
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [showMessage, setShowMessage] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const submission = async (data) => {
    try {
      // Eliminar datos antiguos antes de iniciar sesión
      localStorage.removeItem("Token");
      localStorage.removeItem("id_usuario");
      localStorage.removeItem("sessionClosed"); // Eliminar sessionClosed si existe

      const response = await login(data.email, data.password);
      console.log("Inicio de sesión exitoso:", response.data);

      // Verifica si el token está siendo guardado en localStorage
      console.log("Token guardado:", response.data.token);

      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("id_usuario", response.data.user.id); // Suponiendo que el backend te devuelve el id del usuario
      console.log("id_usuario", response.data.user.id);

      setLoginSuccess(true);
      navigate(`/home`);
    } catch (error) {
      setShowMessage(true);
      console.error("Error durante el inicio de sesión", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-orange-950 via-blue-700 to-blue-400">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        {/* Sección de Logo y Nombre */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/conquistador.png" // Cambia esto por la ruta correcta de tu logo
            alt="Logo de la Empresa"
            className="h-16 mb-2" // Ajusta el tamaño según sea necesario
          />
          <h1 className="text-xl font-bold text-red-700">Conquistador Y.S.</h1>
        </div>

        <h2 className="text-3xl text-center font-bold text-blue-600 mb-6">
          Iniciar sesión
        </h2>

        {showMessage && (
          <div className="mb-4 p-4 text-white bg-red-600 rounded-md">
            Error al iniciar sesión, inténtelo de nuevo o restablezca su
            contraseña.
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
                  autoComplete="username" // Atributo añadido aquí
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
                  autoComplete="current-password" // Atributo añadido aquí
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