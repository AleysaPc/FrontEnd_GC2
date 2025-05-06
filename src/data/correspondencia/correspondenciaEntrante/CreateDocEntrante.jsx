import { InputField } from "../../../components/shared/InputField";
import CreateEntity from "../../../components/shared/CreateEntity";
import {
  useContactos,
  useCorrespondenciaEntranteMutations,
} from "../../../hooks/useEntities";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";
import { SelectField } from "../../../components/shared/SelectField";
import DocumentosFieldArray from "../../../components/shared/DocumentoFieldArray";

export default function createCorrespondenciaEntrante() {
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
    documento: [
      {
        id_documento: "",
        nombre_documento: "",
        archivo: "",
        fecha_subida: "",
        correspondencia: "",
        tipo_documento: "",
        tipo_documento_interno: "",
      },
    ],
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
      component: DocumentosFieldArray,
      label: "Documentos",
      name: "documento",
      onChange: manejarEntradas.handleInputChange,
    },
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
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
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
