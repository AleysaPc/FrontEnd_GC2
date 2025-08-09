import {
  useCorrespondenciaElaboradaMutations,
  useCorrespondenciaElaborada,
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
import { TextAreaField } from "../../../components/shared/TextAreaField";
import { useUsers } from "../../../hooks/useEntities";

export default function editElaborada() {
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
    { id: "en_revision", nombre: "En revisión" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },
    { id: "borrador", nombre: "Borrador" },
  ];
  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const configuracionFormulario = (entidad) => {
    // Asegurarse de que los usuarios sean un array de números
    const usuarios = Array.isArray(entidad?.data?.usuarios)
      ? entidad.data.usuarios.map((user) =>
          typeof user === "object" ? user.id : Number(user)
        )
      : [];

    return {
      //Modelo 3 - Correspondencia
      referencia: entidad?.data?.referencia || "",
      descripcion: entidad?.data?.descripcion || "",
      paginas: entidad?.data?.paginas || "",
      comentario: entidad?.data?.comentario || "",
      contacto: entidad?.data?.contacto || "", //Es el nombre del FK que tiene conectado con la correspondencia
      documentos: Array.isArray(entidad?.data?.documentos)
        ? entidad.data.documentos
        : [],
      estado: entidad?.data?.estado || "",
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
    link: "/ElaboradaList",
    data: {
      ...camposExtras(formValues),
      comentario_derivacion: formValues.comentario_derivacion || "",
    },
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Referencia",
      name: "referencia",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: TextAreaField,
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
      component: InputField,
      label: "Comentario",
      name: "comentario",
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
      component: SelectField,
      label: "Estado",
      name: "estado",
      options: estadoOptions,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: MultipleInputs,
      label: "Documento",
      name: "documentos",
      type: "file",
      required: false,
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
    title: "Registrar Correspondencia Enviada",
    subTitle: "Formulario para registrar correspondencia Enviada",
    icon: FaPlus,
    actions: [
      {
        to: "/ElaboradaList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };
  return (
    <EditEntity
      useEntityMutations={useCorrespondenciaElaboradaMutations}
      useEntity={useCorrespondenciaElaborada}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
