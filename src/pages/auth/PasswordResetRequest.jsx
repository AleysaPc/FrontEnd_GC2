import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePasswordResetRequest } from "../../hooks/useEntities";

const PasswordResetRequest = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const { mutate, isSuccess, isError, error } = usePasswordResetRequest();

  const onSubmit = (data) => {
    mutate(data.email);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-green-400 via-indigo-400 to-orange-500">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl text-center font-bold text-teal-600 mb-6">
          Solicitar restablecimiento de contraseña
        </h2>

        {isSuccess && (
          <div className="mb-4 p-4 text-white bg-green-600 rounded-md">
            Si tu correo electrónico existe, has recibido un correo electrónico
            con instrucciones. para restablecer la contraseña.
          </div>
        )}
        {isError && <div className="text-red-600">Error: {error.message}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Solicitar restablecimiento de contraseña
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-teal-600 hover:underline">
            ¿Recordaste tu contraseña? Inicia sesión aquí.
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequest;