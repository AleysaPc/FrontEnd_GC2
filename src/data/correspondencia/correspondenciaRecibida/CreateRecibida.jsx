import { InputField } from "../../../components/shared/InputField";
import { MultipleInputs } from "../../../components/shared/MultipleInputs";
import CreateEntity from "../../../components/shared/CreateEntity";
import {
  useContactos,
  useCorrespondenciaEntranteMutations,
  useUsers,
} from "../../../hooks/useEntities";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";
import { SelectField } from "../../../components/shared/SelectField";
import { UserCheckboxList } from "../../../components/shared/UserCheckboxList";

export default function createRecibida() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const contactoOptions = () =>
    paraSelectsdestructuringYMap(
      useContactos,
      true,
      "id_contacto",
      "nombre_completo"
    );
  
  const usuarioOptions = () =>
    paraSelectsdestructuringYMap(
      useUsers,
      true,
      "id",
      "email"
    );
  
  const opcionPrioridad = [
    { id: "alta", nombre: "Alta" },
    { id: "media", nombre: "Media" },
    { id: "baja", nombre: "Baja" },
  ];

  const opcionEstado = [
    { id: "registrado", nombre: "Registrado" },
    { id: "en_revision", nombre: "En revisión" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },

  ];

  const configuracionFormulario = {
    fecha_recepción: "",
    hora_recepción: "",
    fecha_respuesta: "",
    tipo: "recibido",
    referencia: "",
    descripcion: "",
    paginas: "",
    prioridad: "",
    estado: "",
    comentario: "",
    contacto: "",
    documentos: [],
    usuarios: [], // Changed from usuario to usuarios and made it an array
  };
  const camposExtras = (formValues) => ({
    usuario: logicaNegocio.idUsuario,
    contacto: Number(formValues.contacto),
    usuarios: Array.isArray(formValues.usuarios) 
      ? formValues.usuarios.map(Number) // Convertir cada ID a número
      : [],
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
      label: "Hora Recepción",
      name: "hora_recepción",
      type: "time",
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
    {
      component: InputField,
      label: "Fojas",
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
      label: "Fecha Respuesta",
      name: "fecha_respuesta",
      type: "date",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
    
    {
      component: MultipleInputs,
      label: "Documento",
      name: "documentos",
      type: "file",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: UserCheckboxList,
      label: "Deribar a:",
      name: "usuarios",
      options: usuarioOptions(),
      onChange: (name, value) => manejarEntradas.handleToggleChange(name)(value),
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
