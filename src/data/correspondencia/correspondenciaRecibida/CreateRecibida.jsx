import { InputField } from "../../../components/shared/InputField";
import { MultipleInputs } from "../../../components/shared/MultipleInputs";
import CreateEntity from "../../../components/shared/CreateEntity";
import {
  useContactos,
  useCorrespondenciaRecibidaMutations,
  useUsers,
} from "../../../hooks/useEntities";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";
import { SelectField } from "../../../components/shared/SelectField";
import { UserDropdownSelect } from "../../../components/shared/UserDropdownSelect";
import { useEffect } from "react";
import FormattedDate from "../../../components/shared/FormattedDate";
import { TextAreaField } from "c:/Users/Admin/Desktop/SystemGC2/Frontend/src/components/shared/TextAreaField";

export default function createRecibida() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const {
    data: contactosData,
    isLoading: loadingContactos,
    error: errorContactos,
  } = useContactos({ all_data: true });
  const {
    data: usuariosData,
    isLoading: loadingUsuarios,
    error: errorUsuarios,
  } = useUsers({ all_data: true });

  // Asegurarnos de que los datos sean arrays
  const contactosArray = contactosData?.data || [];
  const usuariosArray = usuariosData?.data || [];

  const { options } = useFormEntity();

  const contactoOptions = () =>
    contactosArray
      ? options(contactosArray, "id_contacto", "nombre_completo")
      : [];

  const usuarioOptions = () =>
    usuariosArray ? options(usuariosArray, "id", "email") : [];

  // Manejo de errores
  useEffect(() => {
    if (errorContactos) {
      console.error("Error al cargar contactos:", errorContactos);
    }
    if (errorUsuarios) {
      console.error("Error al cargar usuarios:", errorUsuarios);
    }
  }, [errorContactos, errorUsuarios]);

  if (loadingContactos || loadingUsuarios) {
    return <div className="text-center">Cargando datos...</div>;
  }

  if (errorContactos || errorUsuarios) {
    return (
      <div className="text-red-500 text-center">Error al cargar datos</div>
    );
  }

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
    formType: "recibida",
    //fecha_recepcion: "",
    fecha_respuesta: "",
    hora_respuesta: "",
    tipo: "recibido",
    //referencia: "",
    //descripcion: "",
    paginas: "",
    prioridad: "",
    estado: "",
    comentario: "",
    contacto: "",
    comentario_derivacion: "",
    documentos: [],
    usuarios: [], // Changed from usuario to usuarios and made it an array
  };
  const camposExtras = (formValues) => ({
    contacto: Number(formValues.contacto),
    usuarios: Array.isArray(formValues.usuarios)
      ? formValues.usuarios.map(Number)
      : [],
    comentario_derivacion: formValues.comentario_derivacion || "",
  });

  const paraEnvio = (formValues) => ({
    link: "/correspondenciaRecibidaList",
    data: {
      ...camposExtras(formValues),
      comentario_derivacion: formValues.comentario_derivacion || "",
    },
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: ({ value, ...props }) => (
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <InputField
            label="Fecha Recepción"
            name="fecha_recepcion"
            type="date"
            required={true}
            value={formValues.fecha_recepcion || ""}
            onChange={manejarEntradas.handleInputChange}
            className="flex-1"
          />
          <InputField
            label="Hora de recepción"
            name="hora_recepcion"
            type="time"
            required={true}
            value={formValues.hora_recepcion || ""}
            onChange={manejarEntradas.handleInputChange}
            className="flex-1"
          />
        </div>
      ),
      name: "fecha_hora_recepcion", // This is required but won't be used for form values
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
      label: "Descripción del Documento (Opcional)",
      name: "descripcion",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Remitente",
      name: "contacto", //Hace referencia al modelo correspondencia
      options: contactoOptions(),
      onChange: manejarEntradas.handleInputChange,
      isLoading: loadingContactos,
      error: errorContactos,
      actionButtons: [
        {
          to: "/createContacto",
          state: { from: "createRecibida" },
          icon: FaPlus,
          title: "Agregar Contacto",
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/contactoList",
          icon: FaEye,
          title: "Ver lista de contactos",
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
      component: ({value, ...props}) => (
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <InputField
            label="Fecha Respuesta"
            name="fecha_respuesta"
            type="date"
            required={false}
            value={formValues.fecha_respuesta || ""}
            onChange={manejarEntradas.handleInputChange}
            className="flex-1"
          />
          <InputField
            label="Hora de respuesta"
            name="hora_respuesta"
            type="time"
            required={false}
            value={formValues.hora_respuesta || ""}
            onChange={manejarEntradas.handleInputChange}
            className="flex-1"
          />
        </div>
      ),
      name: "fecha_hora_respuesta", // This is required but won't be used for form values
    },
    {
      component: MultipleInputs,
      label: "Documento",
      name: "documentos",
      type: "file",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: UserDropdownSelect,
      label: "Derivar a:",
      name: "usuarios",
      options: usuarioOptions(),
      onChange: (name, value) =>
        manejarEntradas.handleToggleChange(name)(value),
      isLoading: loadingUsuarios,
      error: errorUsuarios,
    }, 
    {
      component: TextAreaField,
      label: "Comentario",
      name: "comentario_derivacion",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Registrar",
    subTitle: "Nueva correspondencia recibida",
    icon: FaPlus,
    actions: [
      {
        to: "/correspondenciaList",
        label: " Cancelar ",
        icon: FaBackspace,
        estilos:
          "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
      },
    ],
  };

  return (
    <>
      <CreateEntity
        useEntityMutations={useCorrespondenciaRecibidaMutations}
        configForm={configuracionFormulario}
        paraEnvio={paraEnvio}
        construirCampos={construirCampos}
        paraNavegacion={paraNavegacion}
      />
    </>
  );
}
