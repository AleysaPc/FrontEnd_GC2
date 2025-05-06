import { ActionButton } from "./ActionButton";
import { Navigation } from "./Navigation";
import Modal from "./Modal";
import { useState } from "react";

const EntityForm = ({
  valorsForm,
  manejarEnviar,
  fields,
  esLoading,
  entityId,
  paraNavegacion,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  const openModal = () => {
    console.log("Abriendo modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Cerrando modal");
    setIsModalOpen(false);
  };

  if (esLoading) return <div>Loading...</div>;

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 mx-auto">
      <Navigation
        title={paraNavegacion.title}
        subTitle={paraNavegacion.subTitle}
        icon={paraNavegacion.icon}
        actions={paraNavegacion.actions}
      />
      <form
        onSubmit={manejarEnviar}
        className="space-y-3 p-2 border-2 border-gray-400 rounded-lg my-2 w-full"
      >
        {fields.map(({ component: Component, actionButtons, ...props }) => (
          <div key={props.name} className={actionButtons && "flex flex-col md:flex-row items-start"}>
            <Component {...props} value={valorsForm[props.name]} />

            {/* Renderizando los botones adicionales */}
            {actionButtons && (
              <div className="mt-8 flex flex-wrap m-1">
                {actionButtons.map((button, index) => (
                  <ActionButton
                    key={index}
                    onClick={button.to ? openModal : undefined}
                    icon={button.icon}
                    estilos={button.estilos}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        <ActionButton
          type="submit"
          label={entityId ? "Actualizar" : "Crear"}
          estilos="hover:bg-gray-600 hover:text-gray-100 text-black border-2 border-gray-400 rounded-md flex items-center gap-2 transition duration-200 p-1"
        />
      </form>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Editar Información</h2>
        <p>Contenido del modal aquí...</p>
        <button
          onClick={closeModal}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

export default EntityForm;