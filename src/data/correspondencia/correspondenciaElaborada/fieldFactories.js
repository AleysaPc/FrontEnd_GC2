import { SelectField } from "../../../components/shared/SelectField";
import { InputField } from "../../../components/shared/InputField";
import { CKEditorField } from "../../../components/shared/CKEditorField";
import { FaPlus, FaEye } from "react-icons/fa";

/**
 * Campo destinatario (contacto)
 */
export const campoDestinatarioContacto = ({
  contactoOptions,
  manejarEntradas,
  loadingContactos,
  errorContactos,
}) => ({
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
  validate: (value) =>
    !value ? "El destinatario es requerido" : null,
});

/**
 * Campo referencia
 */
export const campoReferencia = (manejarEntradas) => ({
  component: InputField,
  label: "Referencia",
  name: "referencia",
  onChange: manejarEntradas.handleInputChange,
});
/**
 * Destino Interno
 */
export const campoDestinoInterno = ({
  usuarioOptions,
  manejarEntradas,
  loadingUsuarios,
  errorUsuarios,
}) => ({
  component: SelectField,
  label: "Destinatario",
  name: "destino_interno",
  options: usuarioOptions(),
  onChange: manejarEntradas.handleInputChange,
  required: true,
  isLoading: loadingUsuarios,
  error: errorUsuarios,
  validate: (value) =>
    !value ? "El destinatario es requerido" : null,
});

/**
 * Campo editor CKEditor
 */
export const campoDescripcion = ({
  label,
  name,
  value,
  manejarEntradas,
  required = false,
}) => ({
  component: CKEditorField,
  label,
  name,
  value,
  onChange: manejarEntradas.handleInputChange,
  required,
});

export const campoDestinatario = ({
  contactoOptions,
  usuarioOptions,
  manejarEntradas,
  loadingContactos,
  errorContactos,
  loadingUsuarios,
  errorUsuarios,
  tipoDestinatario, // "interno" o "externo"
}) => {
  if (tipoDestinatario === "interno") {
    return campoDestinoInterno({
      usuarioOptions,
      manejarEntradas,
      loadingUsuarios,
      errorUsuarios,
    });
  } else {
    return campoDestinatarioContacto({
      contactoOptions,
      manejarEntradas,
      loadingContactos,
      errorContactos,
    });
  }
};

