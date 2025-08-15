import { useFormEntity } from "../../../utils/useFormEntity";
import {
  useDepartamentoMutations,
  useDepartamento,
  useUsers,
} from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { ToggleSwitch } from "../../../components/shared/ToggleSwitch";
import { SelectField } from "../../../components/shared/SelectField";
import { FaBackspace, FaEdit } from "react-icons/fa";
import EditEntity from "../../../components/shared/EditEntity";


export default function EditDepartament() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

const responsableOptions = () =>
    paraSelectsdestructuringYMap(useUsers, true, "id", "username");

  const configuracionFormulario = (entidad) => ({
    nombre: entidad?.nombre || "",
    sigla: entidad?.sigla || "",
    estado: entidad?.estado || false,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id,
    link: "/departamentList",
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
      label: "Sigla",
      name: "sigla",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: ToggleSwitch,
      label: "Estado",
      name: "estado",
      checked: formValues.estado,
      onChange: manejarEntradas.handleToggleChange("estado"),
    },
  ];

  const paraNavegacion = {
    title: "Editar Departamento",
    subTitle: "Formulario para editar departamento",
    icon: FaEdit,
    actions: [
      {
        to: -1,
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return (
    <EditEntity
      useEntityMutations={useDepartamentoMutations}
      useEntity={useDepartamento}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
