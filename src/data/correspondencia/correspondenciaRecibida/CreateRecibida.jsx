import { InputField } from "../../../components/shared/InputField";
import CreateEntity from "../../../components/shared/CreateEntity";
import {
  useContactos,
  useCorrespondenciaEntranteMutations,
} from "../../../hooks/useEntities";
import {
  FaBackspace,
  FaEye,
  FaPencilAlt,
  FaPlus,
} from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";
import { SelectField } from "../../../components/shared/SelectField";
//import UploadDocumentoFieldArray from "../../../components/shared/UploadDocumento";

export default function createRecibida() {
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
  // const documentoOptions = () =>
  //   //Modelo 2
  //   paraSelectsdestructuringYMap(
  //     useTiposDocumentos,
  //     true, //maneja la logica de la paginacion
  //     "id_tipo_documento",
  //     "nombre_tipo_documento"
  //   );

  const opcionPrioridad = [
    { id: "alta", nombre: "Alta" },
    { id: "media", nombre: "Media" },
    { id: "baja", nombre: "Baja" },
  ];

  const opcionEstado = [
    { id: "en revision", nombre: "En revisión" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },
  ];

  const configuracionFormulario = {
    fecha_recepción: "",
    fecha_respuesta: "",
    tipo: "recibido",
    referencia: "",
    descripcion: "",
    paginas: "",
    prioridad: "",
    estado: "",
    comentario: "",
    contacto: "",
    documento: "",
  };
  const camposExtras = (formValues) => ({
    usuario: logicaNegocio.idUsuario,
    contacto: Number(formValues.contacto),
  });

  const paraEnvio = (formValues) => ({
    link: "/correspondenciaRecibidaList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Fecha Recepción",
      name: "fecha_recepción",
      type: "date",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha Respuesta",
      name: "fecha_respuesta",
      type: "date",
      required: false,
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

    // {
    //   component: InputField,
    //   label: "Comentario",
    //   name: "comentario",
    //   onChange: manejarEntradas.handleInputChange,
    //   required: false,
    // },
    {
      component: SelectField,
      label: "Remitente",
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
    // {
    //   component: UploadDocumentoFieldArray,
    //   label: "Documentos",
    //   name: "documento",
    //   onChange: manejarEntradas.handleInputChange,
    // },
    // {
    //   component: InputField,
    //   label: "Documento",
    //   name: "documento",
    //   type: "file",
    //   onChange: manejarEntradas.handleInputChange,
    //   required: false,
    // },
  ];

  const paraNavegacion = {
    title: "Registrar Correspondencia",
    subTitle: "Correspondencia Entrante",
    icon: FaPlus,
    actions: [
      {
        to: "/correspondenciaList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-red-800 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return (
    <>
      <CreateEntity
        useEntityMutations={useCorrespondenciaEntranteMutations}
        configForm={configuracionFormulario}
        paraEnvio={paraEnvio}
        construirCampos={construirCampos}
        paraNavegacion={paraNavegacion}
      />
    </>
  );
}
