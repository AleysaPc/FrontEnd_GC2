import { InputField } from "../../../components/shared/InputField";
import { FaPlus, FaBackspace } from "react-icons/fa";
import CreateEntity from "../../../components/shared/CreateEntity";
import { useRolMutations } from "../../../hooks/useEntities";
import { useFormEntity } from "../../../utils/useFormEntity";


export default function CreateRol() {
   const configuracionFormulario = {
    nombre: "",
    descripcion: "",
   }    

   const paraEnvio = (formValues) => ({
    link: "/rolList",
   });

   const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nombre",
      name: "nombre",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Descripcion",
      name: "descripcion",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
   ];

   const paraNavegacion = {
    title: "Crear Rol",
    subTitle: "Formulario para crear un nuevo rol",
    icon: FaPlus,
    actions: [
      {
        to: "/rolList",
        label: "Volver",
        icon: FaBackspace,
        estilos: "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return (
    <>
      <CreateEntity
        useEntityMutations={useRolMutations}
        configForm={configuracionFormulario}
        paraEnvio={paraEnvio}
        construirCampos={construirCampos}
        paraNavegacion={paraNavegacion}
      />
    </>
  );
}