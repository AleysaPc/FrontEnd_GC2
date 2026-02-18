import { InputField } from "../../../components/shared/InputField";
import CreateEntity from "../../../components/shared/CreateEntity";
import { useRolMutations, usePermisoList } from "../../../hooks/useEntities";
import { FaPlus } from "react-icons/fa";
import SelectorPermisos from "../../../components/shared/SelectorPermisos";

export default function CreateRol() {
  const { data: permisosData, isLoading, error } = usePermisoList({
    all_data: true,
    per_page: 1000,
  });

  if (isLoading) return <div>Cargando permisos...</div>;
  if (error) return <div>Error cargando permisos</div>;

  const permisos = Array.isArray(permisosData?.data)
    ? permisosData.data
    : permisosData?.data?.results || [];

  const estadoInicial = {
    name: "",
    permissions: [],
  };

  const camposExtras = (formValues) => ({
    name: formValues.name,
    permissions: formValues.permissions,
  });

  const paraEnvio = (formValues) => ({
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nombre",
      name: "name",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectorPermisos,
      permisosData: permisos,
      value: formValues.permissions || [],
      onChange: (ids) => {
        manejarEntradas.handleInputChange({
          target: {
            name: "permissions",
            value: ids,
          },
        });
      },
      label: "Permisos",
      name: "permissions",
    },
  ];

  const paraNavegacion = {
    title: "Crear Rol",
    subTitle: "Asigna un nombre y selecciona permisos para este rol",
    icon: FaPlus,
    actions: [
      {
        to: -1,
        label: "Volver",
        estilos:
          "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
      },
    ],
  };

  return (
    <CreateEntity
      useEntityMutations={useRolMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
