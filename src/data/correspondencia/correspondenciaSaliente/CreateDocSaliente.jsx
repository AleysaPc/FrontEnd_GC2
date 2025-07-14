import { InputField } from "../../../components/shared/InputField";
import CreateEntity from "../../../components/shared/CreateEntity";
import {
  useContactos,
  useCorrespondenciaSalienteMutations,
  useUsers,
} from "../../../hooks/useEntities";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";
import { SelectField } from "../../../components/shared/SelectField";
import { UserCheckboxList } from "../../../components/shared/UserCheckboxList";
import { MultipleInputs } from "../../../components/shared/MultipleInputs";
export default function createEnviada() {
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
    paraSelectsdestructuringYMap(useUsers, true, "id", "email");
  const opcionPrioridad = [
    { id: "alta", nombre: "Alta" },
    { id: "media", nombre: "Media" },
    { id: "baja", nombre: "Baja" },
  ];

  const opcionEstado = [
    { id: "borrador", nombre: "Borrador" },
    { id: "en_revision", nombre: "En revisión" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },
  ];

  const configuracionFormulario = {
    fecha_envio: "",
    fecha_recepcion: "",
    fecha_seguimiento: "",
    tipo: "enviado",
    referencia: "",
    descripcion: "",
    paginas: "",
    prioridad: "",
    estado: "",
    comentario: "",
    contacto: "",
    documentos: [],
    usuarios: [],
  };
  const camposExtras = (formValues) => ({
    contacto: Number(formValues.contacto),
    usuarios: Array.isArray(formValues.usuarios)
      ? formValues.usuarios.map(Number)
      : [],
  });

  const paraEnvio = (formValues) => ({
    link: "/correspondenciaEnviadaList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Fecha Envio",
      name: "fecha_envio",
      type: "date",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha Recepción",
      name: "fecha_recepcion",
      type: "date",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Hora de recepción",
      name: "hora_recepcion",
      type: "time",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha Seguimiento",
      name: "fecha_seguimiento",
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
    //{
    //component: SelectField,
    //label: "Prioridad",
    //name: "prioridad",
    //options: opcionPrioridad,
    //onChange: manejarEntradas.handleInputChange,
    //required: true,
    //},
    //{
    //component: SelectField,
    //label: "Estado",
    //name: "estado",
    //options: opcionEstado,
    //onChange: manejarEntradas.handleInputChange,
    //required: true,
    //},
    //},

    {
      component: InputField,
      label: "Comentario",
      name: "comentario",
      onChange: manejarEntradas.handleInputChange,
      required: false,
    },
    {
      component: SelectField,
      label: "Enviado a:",
      name: "contacto", //Hace referencia al modelo correspondencia
      options: contactoOptions(),
      onChange: manejarEntradas.handleInputChange,
      actionButtons: [
        {
          to: "/createContacto",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/contactoList",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
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
      label: "Derivar a:",
      name: "usuarios",
      options: usuarioOptions(),
      onChange: (name, value) => manejarEntradas.handleToggleChange(name)(value),
    },
  ];

  const paraNavegacion = {
    title: "Registrar Correspondencia",
    subTitle: "Correspondenia Saliente",
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
        useEntityMutations={useCorrespondenciaSalienteMutations}
        configForm={configuracionFormulario}
        paraEnvio={paraEnvio}
        construirCampos={construirCampos}
        paraNavegacion={paraNavegacion}
      />
    </>
  );
}
