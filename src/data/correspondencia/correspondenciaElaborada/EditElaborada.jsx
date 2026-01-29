import {
  useCorrespondenciaElaboradaMutations,
  useCorrespondenciaElaborada,
  useContactos,
  usePlantillaDocumentos,
  useCustomUserList,
} from "../../../hooks/useEntities";
import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import EditEntity from "../../../components/shared/EditEntity";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { MultipleInputs } from "../../../components/shared/MultipleInputs";
import { UserDropdownSelect } from "../../../components/shared/UserDropdownSelect";
import { TextAreaField } from "../../../components/shared/TextAreaField";
import { CKEditorField } from "../../../components/shared/CKEditorField";
import { useEffect, useState } from "react";
import { campoDestinatario, campoReferencia } from "./fieldFactories";

export default function EditElaborada() {
  const { options } = useFormEntity();
  const logicaNegocio = { idUsuario: obtenerIdUser() };

  // --- Estado para guardar tipo de plantilla ---
  const [tipoPlantillaSeleccionada, setTipoPlantillaSeleccionada] =
    useState("");
  const [plantillaInicial, setPlantillaInicial] = useState(null);
  useEffect(() => {
    if (plantillaInicial && tipoPlantillaSeleccionada === "") {
      setTipoPlantillaSeleccionada(plantillaInicial);
    }
  }, [plantillaInicial]);

  // Datos necesarios
  const {
    data: contactosData,
    isLoading: loadingContactos,
    error: errorContactos,
  } = useContactos({ all_data: true });
  const {
    data: usuariosData,
    isLoading: loadingUsuarios,
    error: errorUsuarios,
  } = useCustomUserList({ all_data: true });
  const {
    data: plantillasData,
    isLoading: loadingPlantillas,
    error: errorPlantillas,
  } = usePlantillaDocumentos({ all_data: true });

  const contactosArray = contactosData?.data || [];
  const usuariosArray = usuariosData?.data || [];
  const plantillasArray = plantillasData?.data || [];

  const contactoOptions = () =>
    contactosArray
      ? options(contactosArray, "id_contacto", "nombre_completo")
      : [];
  const usuarioOptions = () =>
    usuariosArray ? options(usuariosArray, "id", "email") : [];
  const plantillaOptions = () =>
    plantillasArray
      ? options(plantillasArray, "id_plantilla", "nombre_plantilla")
      : [];

  const opcionPrioridad = [
    { id: "alta", nombre: "Alta" },
    { id: "media", nombre: "Media" },
    { id: "baja", nombre: "Baja" },
  ];

  const opcionEstado = [
    { id: "en_revision", nombre: "En revisión" },
    { id: "borrador", nombre: "Borrador" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },
  ];

  // --- Configuración del formulario con datos existentes ---
  const configuracionFormulario = (entidad) => {
    if (entidad?.data?.plantilla?.tipo) {
      setPlantillaInicial(entidad.data.plantilla.tipo);
    }

    const usuarios = Array.isArray(entidad?.data?.usuarios)
      ? entidad.data.usuarios.map((user) =>
          typeof user === "object" ? user.id : Number(user),
        )
      : [];

    // Si es informe, intentar separar descripción
    let descripcion_introduccion = "";
    let descripcion_desarrollo = "";
    let descripcion_conclusion = "";

    if (
      entidad?.data?.plantilla?.tipo === "informe" &&
      entidad?.data?.descripcion
    ) {
      const partes = entidad.data.descripcion.split("\n\n");
      descripcion_introduccion = partes[0] || "";
      descripcion_desarrollo = partes[1] || "";
      descripcion_conclusion = partes[2] || "";
    }

    return {
      referencia: entidad?.data?.referencia || "",
      descripcion: entidad?.data?.descripcion || "",
      descripcion_introduccion,
      descripcion_desarrollo,
      descripcion_conclusion,
      paginas: entidad?.data?.paginas || "",
      comentario: entidad?.data?.comentario || "",
      contacto: entidad?.data?.contacto || "",
      documentos: Array.isArray(entidad?.data?.documentos)
        ? entidad.data.documentos
        : [],
      estado: entidad?.data?.estado || "",
      prioridad: entidad?.data?.prioridad || "",
      usuarios: usuarios,
      comentario_derivacion: entidad?.data?.comentario_derivacion || "",
      plantilla_id: entidad?.data?.plantilla?.id_plantilla || "",
      destino_interno: entidad?.data?.destino_interno
        ? { ...entidad.data.destino_interno }
        : { id: "", email: "", nombre: "" },
    };
  };

  // --- Campos extras para el envío ---
  const camposExtras = (formValues) => {
    let descripcionFinal = "";

    if (tipoPlantillaSeleccionada === "informe") {
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
      referencia: formValues.referencia,
      descripcion: descripcionFinal,
      paginas: formValues.paginas,
      comentario: formValues.comentario,
      contacto: formValues.contacto ? Number(formValues.contacto) : null,
      estado: formValues.estado,
      prioridad: formValues.prioridad,
      plantilla_id: Number(formValues.plantilla_id),
      usuarios: Array.isArray(formValues.usuarios)
        ? formValues.usuarios.map(Number)
        : [],
      comentario_derivacion: formValues.comentario_derivacion || "",
      usuario: logicaNegocio.idUsuario,
      destino_interno: formValues.destino_interno || {},
    };
  };

  const paraEnvio = (formValues) => {
    // Determinar link según el ámbito
    const link =
      formValues.ambito === "interno"
        ? "/internalCorrespondenceList"
        : "/externalCorrespondenceList";

    // Retornar objeto unificado
    return {
      entityId: formValues.id_correspondencia,
      link,
      data: camposExtras(formValues),
      comentario_derivacion: formValues.comentario_derivacion || "",
    };
  };

  // --- Construcción de campos dinámicos ---
  const construirCampos = (formValues, manejarEntradas) => {
    const campoPlantilla = {
      component: SelectField,
      label: "Plantilla",
      name: "plantilla_id",
      options: plantillaOptions(),
      onChange: (e) => {
        manejarEntradas.handleInputChange(e);
        const seleccionada = plantillasArray.find(
          (p) => p.id_plantilla === Number(e.target.value),
        );
        setTipoPlantillaSeleccionada(seleccionada?.tipo || "");
      },
      required: true,
      isLoading: loadingPlantillas,
      error: errorPlantillas,
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
    //--------------------------------
    //Determinar tipo de destinatario
    //--------------------------------
    let tipoDestinatario;
    if (formValues.destino_interno) {
      tipoDestinatario = "interno";
    } else {
      tipoDestinatario = "externo";
    }

    if (tipoPlantillaSeleccionada === "nota") {
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
        {
          component: CKEditorField,
          label: "Desarrollo",
          name: "descripcion_desarrollo",
          value: formValues.descripcion_desarrollo,
          onChange: manejarEntradas.handleInputChange,
          required: true,
        },
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
        campoDerivarUsuarios,
        campoComentarioDerivacion,

        {
          component: MultipleInputs,
          label: "Documento",
          name: "documentos",
          type: "file",
          onChange: manejarEntradas.handleInputChange,
        },
        campoPrioridad,
        campoEstado,
        campoDerivarUsuarios,
        campoComentarioDerivacion,
      ];
    }
    if (
      tipoPlantillaSeleccionada === "comunicado" ||
      tipoPlantillaSeleccionada === "resolucion" ||
      tipoPlantillaSeleccionada === "memorando"
    ) {
      return [
        campoPlantilla,
        {
          component: CKEditorField,
          label: "Desarrollo",
          name: "descripcion_desarrollo",
          value: formValues.descripcion_desarrollo,
          onChange: manejarEntradas.handleInputChange,
          required: true,
        },

        {
          component: MultipleInputs,
          label: "Documento",
          name: "documentos",
          type: "file",
          onChange: manejarEntradas.handleInputChange,
        },
        campoPrioridad,
        campoEstado,
        campoDerivarUsuarios,
        campoComentarioDerivacion,
      ];
    }

    if (tipoPlantillaSeleccionada === "informe") {
      return [
        campoPlantilla,
        {
          component: InputField,
          label: "Referencia",
          name: "referencia",
          onChange: manejarEntradas.handleInputChange,
          required: true,
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
        {
          component: MultipleInputs,
          label: "Documento",
          name: "documentos",
          type: "file",
          onChange: manejarEntradas.handleInputChange,
        },
        campoPrioridad,
        campoEstado,
        campoDerivarUsuarios,
        campoComentarioDerivacion,
      ];
    }
    if (tipoPlantillaSeleccionada === "convocatoria") {
      return [
        campoPlantilla,
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
        {
          component: MultipleInputs,
          label: "Documento",
          name: "documentos",
          type: "file",
          onChange: manejarEntradas.handleInputChange,
        },
        campoPrioridad,
        campoEstado,
        campoDerivarUsuarios,
        campoComentarioDerivacion,
      ];
    }

    // Por defecto
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
      campoDerivarUsuarios,
      campoComentarioDerivacion,
    ];
  };

  const paraNavegacion = {
    title: "Editar Documento",
    subTitle: "Formulario para editar correspondencia elaborada",
    icon: FaPlus,
    actions: [
      {
        to: -1,
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
