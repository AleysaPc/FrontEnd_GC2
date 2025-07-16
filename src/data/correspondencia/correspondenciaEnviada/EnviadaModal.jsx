import EntityList from "../../../components/shared/EntityList";
import { useCorrespondenciaEnviadas } from "../../../hooks/useEntities";

export default function EnviadaModal() {
    const useFields = () => [
        { key: "index", label: "#" },
        { key: "cite", label: "CITE" },
        { key:"estado",label:"Estado"},
        { key: "fecha_envio", label: "Fecha de Envio" },
        { key: "referencia", label: "Referencia" },
        {
            key: "acciones",
            label: "Acciones",
            render: (item) => (
              <div className="flex gap-2">
                <a
                  href={`/editEnviada/${item.id_correspondencia}`}
                  className="bg-orange-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Registrar
                </a>
              </div>
            ),
          },
        
    ];
    const entityData = {
        title: "Documentos Aprobados y Enviados",
        subTitle: "Registrar documentos enviados",
        loadingMessage: "Cargando documentos aprobados y enviados...",
        errorMessage: "Error al obtener los documentos aprobados y enviados",
        fetchDataHook: useCorrespondenciaEnviadas,
        all_data: false, // true para obtener todos los datos, false para paginación
        itemKey: "id_correspondencia", //Debe ser igual al modelo
        entityFields: useFields,
        // actions: [
        //   {
        //     to: "/createCorrespondencia",
        //     label: "Crear Correspondencia",
        //     estilos:
        //       "bg-purple-500 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
        //   },
        //],
      };
    return <EntityList entityData={entityData} />;
}
