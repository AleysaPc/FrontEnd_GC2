import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { usePasswordResetConfirm } from "../../hooks/useEntities";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { handleSubmit, control, watch } = useForm();
  const { mutate, isLoading, isSuccess, isError, error } = usePasswordResetConfirm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    mutate(
      { token, password: data.password },
      {
        onSuccess: () => {
          setTimeout(() => navigate("/"), 3000);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {isSuccess && (
        <div className="absolute top-5 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          Contraseña restablecida con éxito. Serás redirigido en unos segundos.
        </div>
      )}
      {isError && (
        <div className="absolute top-5 bg-red-500 text-white px-4 py-2 rounded shadow-md">
          {error?.message || "Error al restablecer la contraseña."}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Restablecer Contraseña
        </h2>
        
        {/* Campo de Contraseña */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Nueva Contraseña</label>
          <div className="relative">
            <Controller
              name="password"
              control={control}
              rules={{ required: "La contraseña es obligatoria" }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className="w-full border rounded p-2 pr-10"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Campo de Confirmar Contraseña */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Confirmar Contraseña</label>
          <div className="relative">
            <Controller
              name="password2"
              control={control}
              rules={{
                required: "Confirma tu contraseña",
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              }}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className="w-full border rounded p-2 pr-10"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="mb-4 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isLoading ? "Enviando..." : "Restablecer contraseña"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;