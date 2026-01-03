import { useFormEntity } from "../../../utils/useFormEntity";
import {
  usePlantillaDocumentos,
  useCorrespondenciaElaboradaMutations,
  useContactos,
  useUsers,
  useCorrespondenciaRecibida,
  useUser,
} from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import { FaPlus, FaBackspace, FaEye, FaArrowLeft, FaTimes } from "react-icons/fa";
import CreateEntity from "../../../components/shared/CreateEntity";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CKEditorField } from "../../../components/shared/CKEditorField";
import { obtenerIdUser } from "../../../utils/auth";
import { buildCommonFields } from "./commonFields";
import {
  campoDestinatarioContacto,
  campoDescripcion,
  campoReferencia,
  campoDestinoInterno,
  campoDestinatario,
} from "./fieldFactories";
export default function CreateElaborada() {
  //Función principal del formulario
  const { options } = useFormEntity(); //Para transformar arrays en opciones para <Select />.

  //Hooks
  const [searchParams] = useSearchParams(); //Para obtener el parametro de respuesta_a
  const respuestaAId = searchParams.get("respuesta_a");
  const [nroRegistroRespuesta, setNroRegistroRespuesta] = useState(""); //Guarda el número de registro del doc que se responde
  const [tipoPlantillaSeleccionada, setTipoPlantillaSeleccionada] =
    useState(""); //Guarda el tipo de plantilla

  //Hook usuario : Sirve para identificar quien crea el documento, autocompletar el campo usuario
  const userId = obtenerIdUser(); //Obtiene el ID del usuario logueado
  const { data: userResponse } = useUser(userId); //Obtiene datos del usuario completo
  const usuario = userResponse?.data;

  // Trae el documento que estamos respondiendo
  const { data: respuestaData } = useCorrespondenciaRecibida(respuestaAId);
  useEffect(() => {
    if (respuestaData?.data?.nro_registro) {
      setNroRegistroRespuesta(respuestaData.data.nro_registro);
    }
  }, [respuestaData]);

  // Carga de datos para selects Hook de datos selects
  const {
    data: plantillasData,
    isLoading: loadingPlantillas,
    error: errorPlantillas,
  } = usePlantillaDocumentos({ all_data: true });
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

  const plantillasArray = plantillasData?.data || [];
  const contactosArray = contactosData?.data || [];
  const usuariosArray = usuariosData?.data || [];

  const plantillaOptions = () =>
    plantillasArray
      ? options(plantillasArray, "id_plantilla", "nombre_plantilla")
      : [];
  const contactoOptions = () =>
    contactosArray
      ? options(contactosArray, "id_contacto", "nombre_completo")
      : [];
  const usuarioOptions = () =>
    usuariosArray ? options(usuariosArray, "id", "email") : [];

  // Configuración inicial del formulario
  const configuracionFormulario = {
    fecha_elaboracion: "",
    referencia: "",
    descripcion_introduccion: "",
    descripcion_desarrollo: "",
    descripcion_conclusion: "",
    prioridad: "",
    estado: "",
    contacto: "",
    plantilla_id: "",
    usuarios: [],
    usuario_destino: "",
    cite: "",
    respuesta_a: respuestaAId || "",
    comentario: "",
    comentario_derivacion: "",
    documentos: [],
    usuario: "", // se asigna luego
    ambito: "",
    destino_interno: "",
  };

  // Preparar datos para envío (unir descripción según plantilla)
  const camposExtras = (formValues) => {
    return {
      fecha_elaboracion: formValues.fecha_elaboracion,
      referencia: formValues.referencia,
      prioridad: formValues.prioridad,
      estado: formValues.estado,
      plantilla_id: Number(formValues.plantilla_id),
      cite: formValues.cite,
      respuesta_a: respuestaAId ? Number(respuestaAId) : null,
      comentario_derivacion: formValues.comentario_derivacion || "",
      ambito: formValues.ambito,
    };
  };
  //Se envia el payload
  const paraEnvio = (formValues) => ({
    link: "/elaboradaList",
    params: camposExtras(formValues),
    comentario_derivacion: formValues.comentario_derivacion || "",
  });

  // Construcción dinámica de campos del formulario
  const construirCampos = (formValues, manejarEntradas) => {
    // Si usuario existe, asignar su email (solo una vez)
    if (usuario?.email && formValues.usuario !== usuario.email) {
      manejarEntradas.handleInputChange({
        target: { name: "usuario", value: usuario.email },
      });
    }
    const {
      campoAmbito,
      campoPlantilla,
      campoPrioridad,
      campoEstado,
      campoDocumentos,
      campoDerivarUsuarios,
      campoComentarioDerivacion,
    } = buildCommonFields({
      plantillasArray,
      plantillaOptions,
      contactoOptions,
      usuarioOptions,
      loadingPlantillas,
      loadingContactos,
      loadingUsuarios,
      errorPlantillas,
      errorContactos,
      errorUsuarios,
      manejarEntradas,
      setTipoPlantillaSeleccionada,
    });

    if (
      tipoPlantillaSeleccionada === "nota") {

      const tipoDestinatario =
        formValues.ambito === "interno" ? "interno" : "externo";
      return [
        campoPlantilla,
        campoDestinatario({
          contactoOptions,
          usuarioOptions,
          manejarEntradas,
          loadingContactos,
          errorContactos,
          loadingUsuarios,
          errorUsuarios,
          tipoDestinatario,
        }),
        campoReferencia(manejarEntradas),
        campoDescripcion({
          label: "Descripción",
          name: "descripcion_desarrollo",
          value: formValues.descripcion_desarrollo,
          manejarEntradas,
        }),
        {
          component: InputField,
          label: "Páginas",
          name: "paginas",
          type: "number",
          onChange: manejarEntradas.handleInputChange,
          required: true,
        },
        campoPrioridad,
        campoEstado,
        campoDocumentos,
        campoDerivarUsuarios,
        campoComentarioDerivacion,
      ];
    }

    if (
      tipoPlantillaSeleccionada === "comunicado" ||
      tipoPlantillaSeleccionada === "resolucion"
    ) {
      return [
        campoPlantilla,
        {
          component: CKEditorField,
          label: "Descripción",
          name: "descripcion_desarrollo", //OJO CON DESCRIPCIÓN_DESARROLLO NO DESCRIPCIÓN
          value: formValues.descripcion,
          onChange: manejarEntradas.handleInputChange,
          required: true,
        },
        campoPrioridad,
        campoEstado,
        campoDocumentos,
        campoDerivarUsuarios,
        campoComentarioDerivacion,
      ];
    }

    if (tipoPlantillaSeleccionada === "convocatoria") {
      return [
        campoPlantilla,
        {
          component: CKEditorField,
          label: "Contenido",
          name: "descripcion_introduccion",
          value: formValues.descripcion_introduccion,
          onChange: manejarEntradas.handleInputChange,
        },
        {
          component: CKEditorField,
          label: "Lugar y fecha de la convocatoria",
          name: "descripcion_desarrollo",
          value: formValues.descripcion_desarrollo,
          onChange: manejarEntradas.handleInputChange,
          required: true,
        },
        {
          component: CKEditorField,
          label: "Puntos a tratar/Nota/Otro",
          name: "descripcion_conclusion",
          value: formValues.descripcion_conclusion,
          onChange: manejarEntradas.handleInputChange,
          required: true,
        },
        campoPrioridad,
        campoEstado,
        campoDocumentos,
        campoDerivarUsuarios,
        campoComentarioDerivacion,
      ];
    }

    if (tipoPlantillaSeleccionada === "informe") {
      // Decidir tipo de destinatario según la plantilla o campo ambito
      const tipoDestinatario =
        formValues.ambito === "interno" ? "interno" : "externo";

      return [
        campoPlantilla,
        {
          component: InputField,
          label: "Remitente",
          name: "usuario",
          value: formValues.usuario,
          readOnly: true,
          required: true,
          disabled: true,
          variant: "filled",
        },
        campoDestinatario({
          contactoOptions,
          usuarioOptions,
          manejarEntradas,
          loadingContactos,
          errorContactos,
          loadingUsuarios,
          errorUsuarios,
          tipoDestinatario,
        }),
        campoReferencia(manejarEntradas),
        {
          component: CKEditorField,
          label: "Introducción",
          name: "descripcion_introduccion",
          value: formValues.descripcion_introduccion,
          onChange: manejarEntradas.handleInputChange,
        },
        {
          component: CKEditorField,
          label: "Desarrollo",
          name: "descripcion_desarrollo",
          value: formValues.descripcion_desarrollo,
          onChange: manejarEntradas.handleInputChange,
          required: true,
        },
        {
          component: CKEditorField,
          label: "Conclusión",
          name: "descripcion_conclusion",
          value: formValues.descripcion_conclusion,
          onChange: manejarEntradas.handleInputChange,
          required: true,
        },
        campoPrioridad,
        campoEstado,
        campoDocumentos,
        campoDerivarUsuarios,
        campoComentarioDerivacion,
      ];
    }

    if (tipoPlantillaSeleccionada === "memorando") {
      return [
        campoPlantilla,
        {
          component: InputField,
          label: "Remitente",
          name: "usuario",
          value: formValues.usuario,
          readOnly: true,
          required: true,
          disabled: true,
          variant: "filled",
        },
        campoDestinoInterno({
          usuarioOptions,
          manejarEntradas,
          loadingUsuarios,
          errorUsuarios,
        }),
        campoReferencia(manejarEntradas),
        {
          component: CKEditorField,
          label: "Desarrollo",
          name: "descripcion_desarrollo",
          value: formValues.descripcion_desarrollo,
          onChange: manejarEntradas.handleInputChange,
          required: true,
        },
        campoPrioridad,
        campoEstado,
        campoDocumentos,
        campoDerivarUsuarios,
        campoComentarioDerivacion,
      ];
    }

    // Por defecto para otros tipos de plantilla
    return [
      campoAmbito,
      campoPlantilla,
      campoPrioridad,
      campoEstado,
      campoDocumentos,
      campoDerivarUsuarios,
      campoComentarioDerivacion,
    ];
  };

  const paraNavegacion = {
    title: "Elaborar Documento",
    subTitle: `Correspondencia Interna/Externa${
      nroRegistroRespuesta ? ` - Respuesta a: ${nroRegistroRespuesta}` : ""
    }`,
    icon: FaPlus,
    actions: [
      {
        to: -1,
        label: "Cancelar",
        icon: FaTimes,
        estilos:
          "border-white-700 rounded-lg bg-green-700 text-white p-2 hover:bg-red-700 hover:text-white-600"
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
