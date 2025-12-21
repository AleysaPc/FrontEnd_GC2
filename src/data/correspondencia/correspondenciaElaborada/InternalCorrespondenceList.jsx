import { useState } from "react";
import { FaEdit, FaEye, FaStream } from "react-icons/fa";
import { ActionButton } from "../../../components/shared/ActionButton";
import { useCorrespondenciaElaboradas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";

export default function internalCorrespondenciaList() {
  //Para el manejo del modal. Variable, FunciónParaCambiarEstado, Cerrado
  const [modalVisible, setModalVisible] = useState(false);

  //GuardaIDCorrespondenciaCambiarCorrespondenciaActiva Null no hay selección
  const [correspondenciaId, setCorrespondenciaId] = useState(null);

  //Hook useCorrespondenciaElaboradas. Usualmente se basa en fetch,
  // axios o una librería como React Query para manejar la petición y su estado.

  //Data contiene los datos traidos del backend | petitición en curso? |
  const { data, isLoading, error } = useCorrespondenciaElaboradas({
    //Parametro, para traer todos los datos del registro
    all_data: true,
  });

  //Es una función manejadora de eventos para abrir un modal
  //Parametro
  const handleOpenModal = (idCorrespondencia) => {
    setCorrespondenciaId(idCorrespondencia);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false); //Oculta el modal
    setCorrespondenciaId(null); //limpia la correspondencia activa
  };

  //useFields es un hook que devuelve un arreglo de objetos
  const useFields = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (
        item //render es una función que recibe los datos de la fila actual, permite hacer "acciones sobre la fila"
      ) => (
        //item es el objeto, la fila completa de los datos "." siver para acceder a la propiedad.
        <div className="flex gap-2">
          <ActionButton
            to={`/vistaPreviaDocumento/${item.id_correspondencia}`}
            icon={FaEye}
            ttile={"Vista previa del documento"}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 p-1"
          />
          <button
            onClick={() => handleOpenModal(item.id_correspondencia)}
            title="Ver Trazabilidad"
            className="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
            aria-label="Ver trazabilidad"
          >
            <FaStream />
          </button>
          <ActionButton
            to={`/editElaborada/${item.id_correspondencia}`}
            icon={FaEdit}
            title="Editar"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "cite",
      label: "CITE",
    },
    {
      key: "referencia",
      label: "Referencia",
      render: (item) => item.referencia?.trim() || "Sin referencia",
    },
    {
      key: "datos_contacto",
      label: "Destinatario",
    },

    { key: "estado", label: "Estado" },
    {
      key: "email",
      label: "Elaborado por",
      render: (item) => item.usuario?.email || "No especificado",
    },
  ];

  const entityData = {
    title: "Correspondencia Interna",
    subTitle: "Listado",
    loadingMenssage: "Cargando documentos internos...",
    errorMesage: "Error al obtener la lista",
    fetchDataHook: (params = {}) =>
      useCorrespondenciaElaboradas({
        ...params,
        filters: {
          ...params.filters,
          ambito: "interno", // Filtro para mostrar solo documentos enviados
        },
      }),
    all_data: false,
    itemKey: "id_correspondencia",
    entityFields: useFields,
  };
  //EntityList es un componente genérico que recibe la configuración entityData.

  return <EntityList entityData={entityData} />;
}

//EntityList es un “contenedor inteligente” que no sabe qué entidad mostrar hasta que recibe entityData. Y entityData le dice:
//qué mostrar (title, subTitle)
//cómo obtenerlo (fetchDataHook)
//cómo mostrar cada columna (entityFields)
//y mensajes mientras carga o hay errores (loadingMessage, errorMessage).
