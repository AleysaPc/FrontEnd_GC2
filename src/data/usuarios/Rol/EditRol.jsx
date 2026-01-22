import { useRol, useRolMutations, usePermisoList } from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { FaBackspace, FaPencilAlt } from "react-icons/fa";
import EditEntity from "../../../components/shared/EditEntity";
import SelectorPermisos from "../../../components/shared/SelectorPermisos";

export default function EditRol() {
  // Obtenemos los permisos desde la API
  const { data: permisosData, isLoading, error } = usePermisoList();
  console.log("Todos los datos?", permisosData);

  if (isLoading) return <div>Cargando permisos...</div>;
  if (error) return <div>Error cargando permisos</div>;

  // Configuración inicial del formulario con datos de la API
  const configuracionFormulario = (rolResponse) => {
    const rol = rolResponse?.data;

    return {
      name: rol?.name || "",
      permissions: Array.isArray(rol?.permissions) ? rol.permissions : [],
    };
  };

  // Parámetros de envío al backend
  const paraEnvio = (formValues) => ({
    entityId: formValues.id,
    link: "/rolList",
  });

  // Campos del formulario
  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nombre",
      name: "name",
      required: true,
      formValue: formValues.name,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectorPermisos,
      permisosData: permisosData?.data?.results || [],
      value: formValues.permissions || [],
      onChange: (ids) => {
        manejarEntradas.handleInputChange({
          target: { name: "permissions", value: ids },
        });
      },
      label: "Permisos",
      name: "permissions",
    },
  ];

  // Configuración de la navegación
  const paraNavegacion = {
    title: "Editar Rol",
    subTitle: "Formulario para editar un rol",
    icon: FaPencilAlt,
    actions: [
      {
        to: "/rolList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return (
    <EditEntity
      useEntityMutations={useRolMutations}
      useEntity={useRol}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
