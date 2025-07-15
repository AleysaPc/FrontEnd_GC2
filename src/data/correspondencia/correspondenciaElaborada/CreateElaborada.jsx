import { useFormEntity } from "../../../utils/useFormEntity";
import { usePlantillaDocumentos, useCorrespondenciaElaboradaMutations, useContactos, useUsers } from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import { FaPlus, FaBackspace, FaEye } from "react-icons/fa";
import CreateEntity from "../../../components/shared/CreateEntity";
import { UserCheckboxList } from "../../../components/shared/UserCheckboxList";
import InputView from "../../../components/shared/InputView";

export default function CreateElaborada() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const plantillaOptions = () =>
    paraSelectsdestructuringYMap(usePlantillaDocumentos, true, "id_plantilla", "nombre_plantilla");

  const contactoOptions = () =>
    paraSelectsdestructuringYMap(useContactos, true, "id_contacto", "nombre_completo");

  const usuarioOptions = () =>
    paraSelectsdestructuringYMap(useUsers, true, "id", "email");

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
    referencia: "",
    descripcion: "",
    prioridad: "",
    estado: "",
    comentario: "",
    contacto: "",
    plantilla_id: "",
    usuarios: [],
    fecha_envio: "",
    cite: "",
  };

  const camposExtras = (formValues) => ({
    referencia: formValues.referencia,
    descripcion: formValues.descripcion,
    prioridad: formValues.prioridad,
    estado: formValues.estado,
    comentario: formValues.comentario,
    contacto: Number(formValues.contacto),
    plantilla_id: Number(formValues.plantilla_id),
    usuarios: Array.isArray(formValues.usuarios)
      ? formValues.usuarios.map(Number)
      : [],
    fecha_envio: formValues.fecha_envio || null,
    cite: formValues.cite,
  });

  const paraEnvio = (formValues) => ({
    link: "/ElaboradaList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputView,
      label: "CITE generado",
      name: "cite",
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
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Contacto",
      name: "contacto",
      options: contactoOptions(),
      onChange: manejarEntradas.handleInputChange,
      required: true,
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
      component: SelectField,
      label: "Plantilla",
      name: "plantilla_id",
      options: plantillaOptions(),
      onChange: manejarEntradas.handleInputChange,
      required: true,
    },
    {
      component: InputField,
      label: "Fecha de Envío",
      name: "fecha_envio",
      type: "date",
      required: false,
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
    title: "Elaborar Documento",
    subTitle: "Correspondencia Interna/Externa",
    icon: FaPlus,
    actions: [
      {
        to: "/correspondenciaElaboradaList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-red-800 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return (
    <CreateEntity
      useEntityMutations={useCorrespondenciaElaboradaMutations}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
