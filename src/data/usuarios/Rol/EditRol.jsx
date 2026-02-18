import { useRol, useRolMutations, usePermisoList } from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { FaBackspace, FaPencilAlt } from "react-icons/fa";
import EditEntity from "../../../components/shared/EditEntity";
import SelectorPermisos from "../../../components/shared/SelectorPermisos";

export default function EditRol() {
  const { data: permisosData, isLoading, error } = usePermisoList({
    all_data: true,
    per_page: 1000,
  });

  const permisos = Array.isArray(permisosData?.data)
    ? permisosData.data
    : permisosData?.data?.results || [];

  if (isLoading) return <div>Cargando permisos...</div>;
  if (error) return <div>Error cargando permisos</div>;

  const configuracionFormulario = (rolResponse) => {
    const rol = rolResponse?.data;

    return {
      name: rol?.name || "",
      permissions: Array.isArray(rol?.permissions) ? rol.permissions : [],
    };
  };

  const paraEnvio = (formValues) => ({
    entityId: formValues.id,
    link: "/rolList",
  });

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
      permisosData: permisos,
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
