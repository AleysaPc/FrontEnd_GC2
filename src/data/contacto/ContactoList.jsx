import EntityList from "../../components/shared/EntityList"
import { useContactos } from "../../hooks/useEntities"
import FormattedDate from "../../components/shared/FormattedDate"

export default function ContactoList() {
    const useFields = () => [
        { key: "index", label: "#" },
        {
            key: "nombre_contacto",
            label: "Nombre",
        },
        {
            key: "apellido_pat_contacto",
            label: "Apellido Paterno",
        },
        {
            key: "apellido_mat_contacto",
            label: "Apellido Materno",
        },
        {
            key: "nombre_institucion",
            label: "Empresa",
        },
        {
            key: "cargo",
            label: "Cargo",
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "acciones",
            label: "Acciones",
            render: (item) => (
              <div className="flex gap-2">
                <a
                  //href={`detailDocEntrante/${item.id_correspondencia}`}
                  className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ver
                </a>
                <a
                  href={`/editContacto/${item.id_contacto}`}
                  className="bg-green-800 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Editar
                </a>
              </div>
            ),
          },
    
    ];

    
    const entityData = {
        title: "Gestión de Contactos",
        subTitle: "Listado de contactos",
        loadingMessage: "Cargando contactos...",
        errorMessage: "Error al obtener los contactos",
        fetchDataHook: useContactos,
        all_data: false, // true para obtener todos los datos, false para paginación
        itemKey: "id_contacto", //Debe ser igual al modelo
        entityFields: useFields,
        clavesBusqueda: ["nombre"],
        actions: [
            {
                to: "/createContacto",
                label: "Crear",
                estilos:
                    "bg-red-800 hover:bg-red-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
            },
        ],
    };
    return <EntityList entityData={entityData} />;
}