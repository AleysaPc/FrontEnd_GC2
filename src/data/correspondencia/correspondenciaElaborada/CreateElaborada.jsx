import { useFormEntity } from "../../../utils/useFormEntity";
import { 
  usePlantillaDocumentos, 
  useCorrespondenciaElaboradaMutations, 
  useContactos, 
  useUsers,
  useCorrespondenciaRecibida // Add this import
} from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import { FaPlus, FaBackspace, FaEye, FaArrowLeft } from "react-icons/fa";
import CreateEntity from "../../../components/shared/CreateEntity";
import { UserCheckboxList } from "../../../components/shared/UserCheckboxList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TextAreaField } from "../../../components/shared/TextAreaField";

export default function CreateElaborada() {
  const { paraSelectsdestructuringYMap, options } = useFormEntity();
  const [searchParams] = useSearchParams();
  const respuestaAId = searchParams.get("respuesta_a");
  const [nroRegistroRespuesta, setNroRegistroRespuesta] = useState("");

  // Fetch the response document if respuestaAId is provided
  const { data: respuestaData, isLoading: isLoadingRespuesta } = useCorrespondenciaRecibida(respuestaAId);
  
  useEffect(() => {
    if (respuestaData?.data?.nro_registro) {
      setNroRegistroRespuesta(respuestaData.data.nro_registro);
    }
  }, [respuestaData]);

  const { data: plantillasData, isLoading: loadingPlantillas, error: errorPlantillas } = usePlantillaDocumentos({ all_data: true });
  const { data: contactosData, isLoading: loadingContactos, error: errorContactos } = useContactos({ all_data: true });
  const { data: usuariosData, isLoading: loadingUsuarios, error: errorUsuarios } = useUsers({ all_data: true });

  // Asegurarnos de que los datos sean arrays
  const plantillasArray = plantillasData?.data || [];
  const contactosArray = contactosData?.data || [];
  const usuariosArray = usuariosData?.data || [];

  const plantillaOptions = () =>
    plantillasArray ? options(plantillasArray, "id_plantilla", "nombre_plantilla") : [];

  const contactoOptions = () =>
    contactosArray ? options(contactosArray, "id_contacto", "nombre_completo") : [];

  const usuarioOptions = () =>
    usuariosArray ? options(usuariosArray, "id", "email") : [];

  // Manejo de errores
  useEffect(() => {
    if (errorPlantillas) {
      console.error('Error al cargar plantillas:', errorPlantillas);
    }
    if (errorContactos) {
      console.error('Error al cargar contactos:', errorContactos);
    }
    if (errorUsuarios) {
      console.error('Error al cargar usuarios:', errorUsuarios);
    }
  }, [errorPlantillas, errorContactos, errorUsuarios]);

  if (loadingPlantillas || loadingContactos || loadingUsuarios) {
    return <div className="text-center">Cargando datos...</div>;
  }

  if (errorPlantillas || errorContactos || errorUsuarios) {
    return <div className="text-red-500 text-center">Error al cargar datos</div>;
  }



  const opcionPrioridad = [
    { id: "alta", nombre: "Alta" },
    { id: "media", nombre: "Media" },
    { id: "baja", nombre: "Baja" },
  ];

  const opcionEstado = [
    { id: "en_revision", nombre: "En revisión" },
    { id: "borrador", nombre: "Borrador"},
    { id: "aprobado", nombre: "Aprobado" },
  ];

  const configuracionFormulario = {
    fecha_elaboracion: "",
    referencia: "",
    descripcion: "",
    prioridad: "",
    estado: "",
    contacto: "",
    plantilla_id: "",
    usuarios: [],
    cite: "",
    respuesta_a: respuestaAId || "",
    comentario:"",
    comentario_derivacion:"",
    
  };

  const camposExtras = (formValues) => ({
    fecha_elaboracion: formValues.fecha_elaboracion,
    referencia: formValues.referencia,
    descripcion: formValues.descripcion,
    prioridad: formValues.prioridad,
    estado: formValues.estado,
    contacto: Number(formValues.contacto),
    plantilla_id: Number(formValues.plantilla_id),
    usuarios: Array.isArray(formValues.usuarios)
      ? formValues.usuarios.map(Number)
      : [],
    cite: formValues.cite,
    respuesta_a: respuestaAId ? Number(respuestaAId) : null,
    comentario_derivacion: formValues.comentario_derivacion || "",
  });

  const paraEnvio = (formValues) => ({
    link: "/ElaboradaList",
    params: camposExtras(formValues),
    comentario_derivacion: formValues.comentario_derivacion || "",
  });

  const construirCampos = (formValues, manejarEntradas) => [
    //{
    //  component: InputView,
    //  label: "CITE generado",
    //  name: "cite",
    //},  
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
      component: SelectField,
      label: "Destinatario",
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
      isLoading: loadingContactos,
      error: errorContactos,
    },
    {
      component: SelectField,
      label: "Plantilla",
      name: "plantilla_id",
      options: plantillaOptions(),
      onChange: manejarEntradas.handleInputChange,
      required: true,
      isLoading: loadingPlantillas,
      error: errorPlantillas,
    },
    {
      component: UserCheckboxList,
      label: "Derivar a:",
      name: "usuarios",
      options: usuarioOptions(),
      required: false,
      onChange: (name, value) => manejarEntradas.handleToggleChange(name)(value),
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
    title: "Elaborar Documento",
    subTitle: `Correspondencia Interna/Externa${nroRegistroRespuesta ? ` - Respuesta a: ${nroRegistroRespuesta}` : ''}`,
    icon: FaPlus,
    actions: [
      {
        to: "/correspondenciaElaboradaList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-red-800 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
      {
        to: -1,
        label: "Atras",
        icon: FaArrowLeft,
        estilos:
          "bg-blue-800 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
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
