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
import { FaPlus, FaBackspace, FaEye, FaArrowLeft } from "react-icons/fa";
import CreateEntity from "../../../components/shared/CreateEntity";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TextAreaField } from "../../../components/shared/TextAreaField";
import { CKEditorField } from "../../../components/shared/CKEditorField";
import { obtenerIdUser } from "../../../utils/auth";
import { MultipleInputs } from "../../../components/shared/MultipleInputs";
import { UserDropdownSelect } from "../../../components/shared/UserDropdownSelect";

export default function CreateElaborada() {
  const { options } = useFormEntity();
  const [searchParams] = useSearchParams();
  const respuestaAId = searchParams.get("respuesta_a");
  const [nroRegistroRespuesta, setNroRegistroRespuesta] = useState("");
  const [tipoPlantillaSeleccionada, setTipoPlantillaSeleccionada] =
    useState("");

  const userId = obtenerIdUser();
  const { data: userResponse } = useUser(userId);
  const usuario = userResponse?.data;

  // Obtener nro_registro de la correspondencia recibida si aplica
  const { data: respuestaData } = useCorrespondenciaRecibida(respuestaAId);
  useEffect(() => {
    if (respuestaData?.data?.nro_registro) {
      setNroRegistroRespuesta(respuestaData.data.nro_registro);
    }
  }, [respuestaData]);

  // Carga de datos para selects
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

  console.log("Que usuario tenemos? ", usuario);

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

  const opcionPrioridad = [
    { id: "alta", nombre: "Alta" },
    { id: "media", nombre: "Media" },
    { id: "baja", nombre: "Baja" },
  ];

  const opcionEstado = [
    { id: "en_revision", nombre: "En revisión" },
    { id: "borrador", nombre: "Borrador" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "enviado", nombre: "Enviado" },
  ];

  // Configuración inicial del formulario
  const configuracionFormulario = {
    fecha_elaboracion: "",
    referencia: "",
    descripcion: "",
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
  };

  // Preparar datos para envío (unir descripción según plantilla)
  const camposExtras = (formValues) => {
    const esMemorando = tipoPlantillaSeleccionada === "memorando";

    // Copia segura de usuarios
    let usuariosFinal = Array.isArray(formValues.usuarios)
      ? [...formValues.usuarios]
      : [];

    // 🔑 OBTENER DESTINATARIO COMO TEXTO (TRAMPA CONTROLADA)
    let destinatarioTexto = "";

    if (esMemorando && formValues.usuario_destino) {
      const usuarioSeleccionado = usuariosArray.find(
        (u) => u.id === Number(formValues.usuario_destino)
      );

      if (usuarioSeleccionado) {
        destinatarioTexto = [
          usuarioSeleccionado.first_name,
          usuarioSeleccionado.secund_name,
          usuarioSeleccionado.last_name,
          usuarioSeleccionado.secund_last_name,
        ]
          .filter(Boolean)
          .join(" ");
      }
    }

    const contactoField =
      tipoPlantillaSeleccionada === "nota_externa" && formValues.contacto
        ? { contacto: Number(formValues.contacto) }
        : {};

    let descripcionFinal = "";

    if (
      tipoPlantillaSeleccionada === "informe" ||
      tipoPlantillaSeleccionada === "convocatoria"
    ) {
      descripcionFinal = [
        formValues.descripcion_introduccion || "",
        formValues.descripcion_desarrollo || "",
        formValues.descripcion_conclusion || "",
      ]
        .filter(Boolean)
        .join("\n\n");
    } else {
      descripcionFinal = formValues.descripcion || "";
    }

    return {
      fecha_elaboracion: formValues.fecha_elaboracion,
      referencia: formValues.referencia,
      descripcion: descripcionFinal,
      prioridad: formValues.prioridad,
      estado: formValues.estado,
      ...contactoField,
      plantilla_id: Number(formValues.plantilla_id),

      // ✅ destinatarios reales
      usuarios: usuariosFinal,
      datos_contacto: esMemorando
        ? { nombre_completo: destinatarioTexto }
        : null,

      cite: formValues.cite,
      respuesta_a: respuestaAId ? Number(respuestaAId) : null,
      comentario_derivacion: formValues.comentario_derivacion || "",
    };
  };

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

    const campoPlantilla = {
      component: SelectField,
      label: "Plantilla",
      name: "plantilla_id",
      options: plantillaOptions(),
      onChange: (e) => {
        manejarEntradas.handleInputChange(e);
        const seleccionada = plantillasArray.find(
          (p) => p.id_plantilla === Number(e.target.value)
        );
        setTipoPlantillaSeleccionada(seleccionada?.tipo || "");
      },
      required: true,
      isLoading: loadingPlantillas,
      error: errorPlantillas,
    };

    const campoDocumentos = {
      component: MultipleInputs,
      label: "Documento",
      name: "documentos",
      type: "file",
      onChange: manejarEntradas.handleInputChange,
    };
    const campoPrioridad = {
      component: SelectField,
      label: "Prioridad",
      name: "prioridad",
      options: opcionPrioridad,
      onChange: manejarEntradas.handleInputChange,
      required: true,
    };

    const campoEstado = {
      component: SelectField,
      label: "Estado",
      name: "estado",
      options: opcionEstado,
      onChange: manejarEntradas.handleInputChange,
      required: true,
    };

    const campoDerivarUsuarios = {
      component: UserDropdownSelect,
      label: "Derivar a:",
      name: "usuarios",
      options: usuarioOptions(),
      onChange: (name, value) =>
        manejarEntradas.handleToggleChange(name)(value),
      isLoading: loadingUsuarios,
      error: errorUsuarios,
    };

    const campoComentarioDerivacion = {
      component: TextAreaField,
      label: "Comentario para derivación",
      name: "comentario_derivacion",
      onChange: manejarEntradas.handleInputChange,
    };

    if (
      tipoPlantillaSeleccionada === "nota_externa" ||
      tipoPlantillaSeleccionada === "nota_interna"
    ) {
      return [
        campoPlantilla,
        {
          component: InputField,
          label: "Referencia",
          name: "referencia",
          onChange: manejarEntradas.handleInputChange,
          required: true,
        },
        {
          component: CKEditorField,
          label: "Descripción",
          name: "descripcion_desarrollo",
          value: formValues.descripcion,
          onChange: manejarEntradas.handleInputChange,
        },
        {
          component: InputField,
          label: "Páginas",
          name: "paginas",
          type: "number",
          onChange: manejarEntradas.handleInputChange,
          required: true,
        },
        {
          component: InputField,
          label: "Comentario (Opcional)",
          name: "comentario",
          onChange: manejarEntradas.handleInputChange,
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
          validate: (value) => {
            if (!value) {
              return "El destinatario es requerido";
            }
            return null;
          },
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
        {
          component: SelectField,
          label: "Destinatario",
          name: "usuario_destino",
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
          validate: (value) => {
            if (!value) {
              return "El destinatario es requerido";
            }
            return null;
          },
        },
        {
          component: InputField,
          label: "Referencia",
          name: "referencia",
          value: formValues.referencia,
          onChange: manejarEntradas.handleInputChange,
        },
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
        {
          component: SelectField,
          label: "Destinatario",
          name: "usuario_destino",
          options: usuarioOptions(),
          onChange: manejarEntradas.handleInputChange,
        },
        {
          component: InputField,
          label: "Referencia",
          name: "referencia",
          value: formValues.referencia,
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
        campoPrioridad,
        campoEstado,
        campoDocumentos,
        campoDerivarUsuarios,
        campoComentarioDerivacion,
      ];
    }

    // Por defecto para otros tipos de plantilla
    return [
      campoPlantilla,
      {
        component: CKEditorField,
        label: "Descripción",
        name: "descripcion",
        value: formValues.descripcion,
        onChange: manejarEntradas.handleInputChange,
      },
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
        to: "/elaboradaList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-red-800 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2",
      },
      {
        to: -1,
        label: "Atras",
        icon: FaArrowLeft,
        estilos:
          "bg-blue-800 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2",
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
