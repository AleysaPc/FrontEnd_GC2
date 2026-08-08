import { ActionButton } from "./ActionButton";
import Loading from "./Loading";
import { Navigation } from "./Navigation";
import { useState} from "react";

const EntityForm = ({
  valorsForm,
  manejarEnviar,
  fields,
  esLoading,
  entityId,
  paraNavegacion,
}) => {
  if (esLoading) return <Loading />;

  const [ enviando, setEnviando ] = useState(false);

  return (
    <div className="min-h-screen bg-gray-10">              
      <Navigation
        title={paraNavegacion.title}
        subTitle={paraNavegacion.subTitle}
        icon={paraNavegacion.icon}
        actions={paraNavegacion.actions}
      />

      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 ">
        <form
            onSubmit={ async (e) => {
              if (enviando) return;

              setEnviando(true);
              try {
                await manejarEnviar(e);
              } finally {
                setEnviando(false);
              }
            }}
            encType="multipart/form-data"
            className="space-y-5"
          >
          {fields.map(
            ({ component: Component, actionButtons, ...props }) => (
              <div
                key={props.name}
                className={
                  actionButtons
                    ? "flex flex-col lg:flex-row lg:items-start gap-3"
                    : ""
                }
              >
                <div className="flex-1">
                  <Component
                    {...props}
                    value={valorsForm[props.name]}
                  />
                </div>

                {actionButtons && (
                  <div className="flex flex-wrap gap-2 lg:mt-8">
                    {actionButtons.map((button, index) => (
                      <ActionButton
                        key={index}
                        {...button}
                      />
                    ))}
                  </div>
                )}
              </div>
            ),
          )}

          {/* Botón principal */}
          <div className="pt-4 border-t border-gray-100">
           <button
              type="submit"
              disabled={enviando}
              className="
                bg-gradient-to-r
                from-blue-600
                to-cyan-600
                text-white
                px-6
                py-3
                rounded-lg
                shadow-md
                font-semibold
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {enviando
                ? "Procesando..."
                : entityId
                  ? "Actualizar"
                  : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityForm;