import {
  useCorrespondenciaRecibidaMutations,
  useCorrespondenciaRecibida,
} from "../../../hooks/useEntities";
import { useContactos } from "../../../hooks/useEntities";
import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import EditEntity from "../../../components/shared/EditEntity";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { MultipleInputs } from "../../../components/shared/MultipleInputs";
import { UserCheckboxList } from "../../../components/shared/UserCheckboxList";
import { useUsers } from "../../../hooks/useEntities";

export default function editEnviada() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const {
    data: contactosData,
    isLoading: loadingContactos,
    error: errorContactos,
  } = useContactos({ all_data: true });
  const contactosArray = contactosData?.data || [];

  const {
    data: usuariosData,
    isLoading: loadingUsuarios,
    error: errorUsuarios,
  } = useUsers({ all_data: true });
  const usuariosArray = usuariosData?.data || [];

  const { options } = useFormEntity();

  const contactoOptions = () =>
    contactosArray
      ? options(contactosArray, "id_contacto", "nombre_completo")
      : [];
  
  const usuarioOptions = () =>
    usuariosArray ? options(usuariosArray, "id", "email") : [];

  const estadoOptions = [
    { id: "enviado", nombre: "Enviado" },
    { id: "en_revision", nombre: "En revisión" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },
  ];

  const prioridadOptions = [
    { id: "alta", nombre: "Alta" },
    { id: "media", nombre: "Media" },
    { id: "baja", nombre: "Baja" },
  ];
  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const configuracionFormulario = (entidad) => {
    // Asegurarse de que los usuarios sean un array de números
    const usuarios = Array.isArray(entidad?.data?.usuarios) 
      ? entidad.data.usuarios.map(user => typeof user === 'object' ? user.id : Number(user))
      : [];
      
    return {
      //Modelo 3 - Correspondencia
      fecha_recepcion: entidad?.data?.fecha_recepcion || "",
      hora_recepcion: entidad?.data?.hora_recepcion || "",
      referencia: entidad?.data?.referencia || "",
      descripcion: entidad?.data?.descripcion || "",
      contacto: entidad?.data?.contacto || "", //Es el nombre del FK que tiene conectado con la correspondencia
      paginas: entidad?.data?.paginas || "",
      prioridad: entidad?.data?.prioridad || "",
      estado: entidad?.data?.estado || "",
      fecha_respuesta: entidad?.data?.fecha_respuesta || "",
      documentos: Array.isArray(entidad?.data?.documentos)
        ? entidad.data.documentos
        : [],
      usuarios: usuarios,
      comentario_derivacion: entidad?.data?.comentario_derivacion || "",
    };
  };

  const camposExtras = (formValues) => ({
    contacto: Number(formValues.contacto),
    usuario: logicaNegocio.idUsuario,
    usuarios: Array.isArray(formValues.usuarios) 
      ? formValues.usuarios.map(Number) 
      : [],
    comentario_derivacion: formValues.comentario_derivacion || "",
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id_correspondencia, //del modelo correspondencia
    link: "/correspondenciaRecibidaList",
    data: {
      ...camposExtras(formValues),
      comentario_derivacion: formValues.comentario_derivacion || ""
    }
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
      label: "Descripción (Opcional)",
      name: "descripcion",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Contacto",
      name: "contacto",
      options: contactoOptions(),
      onChange: manejarEntradas.handleInputChange,
      actionButtons: [
        {
          to: `/editContacto/${formValues.contacto}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
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
      component: InputField,
      label: "Paginas",
      name: "paginas",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Prioridad",
      name: "prioridad",
      required: true,
      options: prioridadOptions,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Estado",
      name: "estado",
      options: estadoOptions,
      onChange: manejarEntradas.handleInputChange,
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
            value={formValues.hora_respuesta || ""} //formValues acceder al valor del campo y value le da ese valor del campo
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
      component: UserCheckboxList,
      label: "Derivar a:",
      name: "usuarios",
      options: usuarioOptions(),
      onChange: (name, value) =>
        manejarEntradas.handleToggleChange(name)(value),
      isLoading: loadingUsuarios,
      error: errorUsuarios,
    },
    {
      component: InputField,
      label: "Comentario",
      name: "comentario_derivacion",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
  ];
  const paraNavegacion = {
    title: "Editar Registro",
    subTitle:
      "Formulario para editar el registro de una correspondencia recibida",
    icon: FaPlus,
    actions: [
      {
        to: "/correspondenciaRecibidaList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };
  return (
    <EditEntity
      useEntityMutations={useCorrespondenciaRecibidaMutations}
      useEntity={useCorrespondenciaRecibida}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
