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

export default function editEnviada() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const {
    data: contactosData,
    isLoading: loadingContactos,
    error: errorContactos,
  } = useContactos({ all_data: true });
  const contactosArray = contactosData?.data || [];

  const { options } = useFormEntity();

  const contactoOptions = () =>
    contactosArray
      ? options(contactosArray, "id_contacto", "nombre_completo")
      : [];

  const estadoOptions = [
    { id: "enviado", nombre: "Enviado" },
    { id: "en_revision", nombre: "En revisión" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },
  ];
  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const configuracionFormulario = (entidad) => ({
    //Modelo 3 - Correspondencia
    fecha_envio: entidad?.data?.fecha_envio || "",
    fecha_recepcion: entidad?.data?.fecha_recepcion || "",
    fecha_seguimiento: entidad?.data?.fecha_seguimiento || "",
    referencia: entidad?.data?.referencia || "",
    descripcion: entidad?.data?.descripcion || "",
    paginas: entidad?.data?.paginas || "",
    comentario: entidad?.data?.comentario || "",
    contacto: entidad?.data?.contacto || "", //Es el nombre del FK que tiene conectado con la correspondencia
    documentos: Array.isArray(entidad?.data?.documentos) ? entidad.data.documentos : [],
    estado: entidad?.data?.estado || "",
  });

  const camposExtras = (formValues) => ({
    contacto: Number(formValues.contacto),
    usuario: logicaNegocio.idUsuario,
    comentario: formValues.comentario,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id_correspondencia, //del modelo correspondencia
    link: "/correspondenciaEnviadaList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Fecha de Envio",
      name: "fecha_envio",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha de Recepcion",
      name: "fecha_recepcion",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha de Seguimiento",
      name: "fecha_seguimiento",
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
      component: InputField,
      label: "Comentario",
      name: "comentario",
      required: true,
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
      onChange: manejarEntradas.handleInputChange,
    },
  ];
  const paraNavegacion = {
    title: "Editar Correspondencia Enviada",
    subTitle: "Formulario para editar correspondencia Enviada",
    icon: FaPlus,
    actions: [
      {
        to: "/correspondenciaEnviadaList",
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
