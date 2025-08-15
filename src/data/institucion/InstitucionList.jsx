import EntityList from "../../components/shared/EntityList";
import {
  useInstituciones,
  useInstitucionMutations,
} from "../../hooks/useEntities";
import FormattedDate from "../../components/shared/FormattedDate";
import { FaEdit, FaHistory, FaBackspace, FaTrash, FaPlus } from "react-icons/fa";
import { ActionButton } from "../../components/shared/ActionButton";
import { toast } from "react-hot-toast";

export default function InstitucionList() {
  const institucionMutations = useInstitucionMutations();

  const handleEliminar = async (id_institucion) => {
    if (!confirm("¿Seguro que deseas eliminar esta institucion?")) return;
    try {
      //id:id_institucion porque en el modelo de institucion el id se llama id_institucion pese a que el crud espera un id
      await institucionMutations.eliminar.mutateAsync({ id: id_institucion });
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("Error al eliminar la institucion");
    }
  };
  const useFields = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editInstitucion/${item.id_institucion}`}
            icon={FaEdit}
            title="Editar"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <button
            onClick={() => handleEliminar(item.id_institucion)}
            title="Eliminar"
            className="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
    { key: "razon_social", label: "Razon Social" },
    { key: "direccion", label: "Direccion" },
    { key: "telefono", label: "Telefono" },
    { key: "fecha_fundacion", label: "Fecha Fundacion" },
  ];

  const entityData = {
    title: "Gestión de Instituciones",
    subTitle: "Listado de instituciones",
    loadingMessage: "Cargando instituciones...",
    errorMessage: "Error al obtener las instituciones",
    fetchDataHook: useInstituciones,
    all_data: false, // true para obtener todos los datos, false para paginación
    itemKey: "id_institucion", //Debe ser igual al modelo
    entityFields: useFields,
    clavesBusqueda: ["razon_social"],
    actions: [
      {
        to: "/createInstitucion",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
      {
        to: -1,
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
    filtros: [{ name: "razon_social", placeholder: "Empresa" }],
    ordenes: [
      { name: "razon_social", label: "Empresa" },
      { name: "fecha_fundacion", label: "Fecha Fundacion" },
    ],
  };
  return <EntityList entityData={entityData} />;
}
