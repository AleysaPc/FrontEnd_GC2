import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import CreateEntity from "../../../components/shared/CreateEntity";
import {
  useCorrespondenciaMutations,
  useUsers,
  useContactos,
} from "../../../hooks/useEntities";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";
import { useLocation } from 'react-router-dom';


export default function createCorrespondencia() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const contactoOptions = () =>
    //Modelo 2
    paraSelectsdestructuringYMap(
      useContactos,
      true, //maneja la logica de la paginacion
      "id_contacto",
      "nombre_completo"
    );

  const opcionesTipo = [
    { id: "enviado", nombre: "Enviado" },
    { id: "recibido", nombre: "Recibido" },
  ];

  const opcionPrioridad = [
    { id: "alta", nombre: "Alta" },
    { id: "media", nombre: "Media" },
    { id: "baja", nombre: "Baja" },
  ];

  const opcionEstado = [
    { id: "borrador", nombre: "Borrador" },
    { id: "en revision", nombre: "En revisión" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },
  ];

  const configuracionFormulario = {
    //Modelo 3 - Correspondencia
    tipo: "",
    referencia: "",
    descripcion: "",
    paginas: "",
    prioridad: "",
    estado: "",
    comentario: "",
    documento: "",
    contacto: "", //Es el nombre del FK que tiene conectado con la correspondencia
  };

  const camposExtras = (formValues) => ({
    contacto: Number(formValues.contacto),
    usuario: logicaNegocio.idUsuario,
  });

  const paraEnvio = (formValues) => {
    // Obtener la ruta actual
    const location = useLocation();
    const pathname = location.pathname;
  
    // Si estamos en la ruta de creación de DocEntrante, no redirigimos
    if (pathname === "/createDocEntrante") {
      return {
        link: "", // No redirigir a ninguna parte
        params: camposExtras(formValues), // Mantener los params
        onSuccess: (data) => {
          const id = data?.id;  // Asumiendo que el `id` de la correspondencia viene en la respuesta
          if (id) {
            setIdCorrespondenciaCreada(id); // Guardamos el ID en el estado
            setMostrarModalDocEntrante(true); // Abrimos el modal
          }
        },
      };
    }
  
    // Si no estamos en /createDocEntrante, redirigimos al listado de correspondencias
    return {
      link: "/correspondenciaList", // Redirigir al listado
      params: camposExtras(formValues), // Mantener los params
    };
  };
  
  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: SelectField,
      label: "Tipo",
      name: "tipo",
      options: opcionesTipo,
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Referencia",
      name: "referencia",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Descripción",
      name: "descripcion",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Paginas",
      name: "paginas",
      type: "number",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Prioridad",
      name: "prioridad",
      options: opcionPrioridad,
      onChange: manejarEntradas.handleInputChange,
      required: true,
    },
    {
      component: SelectField,
      label: "Estado",
      name: "estado",
      options: opcionEstado,
      onChange: manejarEntradas.handleInputChange,
      required: true,
    },

    {
      component: InputField,
      label: "Comentario",
      name: "comentario",
      onChange: manejarEntradas.handleInputChange,
      required: false,
    },
    {
      component: SelectField,
      label: "Contacto",
      name: "contacto", //Hace referencia al modelo correspondencia
      options: contactoOptions(),
      onChange: manejarEntradas.handleInputChange,
      actionButtons: [
        {
          to: "/editUsuario",
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/addCategory",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/categoryList",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
    },
    {
      component: InputField,
      label: "Documento",
      name: "documento",
      type: "file",
      onChange: manejarEntradas.handleInputChange,
      required: false,
    },
  ];

  const paraNavegacion = {
    title: "Crear Correspondencia",
    subTitle: "Formulario para crear una nueva correspondencia",
    icon: FaPlus,
    actions: [
      {
        to: "/correspondenciaList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return (
    <CreateEntity
      useEntityMutations={useCorrespondenciaMutations}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
