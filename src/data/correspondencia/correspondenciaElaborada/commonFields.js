import { MultipleInputs } from "../../../components/shared/MultipleInputs";
import { SelectField } from "../../../components/shared/SelectField";
import { TextAreaField } from "../../../components/shared/TextAreaField";
import { UserDropdownSelect } from "../../../components/shared/UserDropdownSelect";
import {opcionAmbito, opcionPrioridad, opcionEstado} from "./correspondenceOptions";

/**
 * Construye campos comunes reutilizables
 * No contiene lógica de negocio
 * Este archivo arma el esqueleto del formulario
 */
export const buildCommonFields = ({
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
}) => {
  // 🔹 Ámbito
  const campoAmbito = {
    component: SelectField,
    label: "Ámbito del documento",
    name: "ambito",
    options: opcionAmbito,
    onChange: manejarEntradas.handleInputChange,
    required: true,
  };

  // 🔹 Plantilla
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

  // 🔹 Prioridad
  const campoPrioridad = {
    component: SelectField,
    label: "Prioridad",
    name: "prioridad",
    options: opcionPrioridad,
    onChange: manejarEntradas.handleInputChange,
    required: true,
  };

  // 🔹 Estado
  const campoEstado = {
    component: SelectField,
    label: "Estado",
    name: "estado",
    options: opcionEstado,
    onChange: manejarEntradas.handleInputChange,
    required: true,
  };

  // 🔹 Documentos
  const campoDocumentos = {
    component: MultipleInputs,
    label: "Documento",
    name: "documentos",
    type: "file",
    onChange: manejarEntradas.handleInputChange,
  };

  // 🔹 Derivar a usuarios
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

  // 🔹 Comentario derivación
  const campoComentarioDerivacion = {
    component: TextAreaField,
    label: "Comentario para derivación",
    name: "comentario_derivacion",
    onChange: manejarEntradas.handleInputChange,
  };

  return {
    campoAmbito,
    campoPlantilla,
    campoPrioridad,
    campoEstado,
    campoDocumentos,
    campoDerivarUsuarios,
    campoComentarioDerivacion,
  };
};
