import EntityForm from "./EntityForm";
import { useFormEntity } from "../../utils/useFormEntity";
import { useState } from "react";
import { useFormCacheSession } from "../../hooks/useFormCacheSession";
import { toast } from "react-hot-toast";

export default function CreateEntity({
  useEntityMutations,
  configForm,
  paraEnvio,
  construirCampos,
  paraNavegacion,
}) {
  const {
    crearEstadoFomulario,
    manejarCambioDeEntrada,
    manejarCambioDeEstado,
    manejarEnvio,
  } = useFormEntity();

  const { crear } = useEntityMutations();

  const [formValues, setFormValues] = useState(
    crearEstadoFomulario(configForm)
  );

  // ✅ Conectamos el cache (clave única por formulario)
  // En CreateEntity.jsx
  // Usa una clave única basada en el tipo de formulario
  const formCacheKey = `form_${configForm.formType}`; // ahora será único por formulario
  const { clearCache } = useFormCacheSession(
    formCacheKey,
    formValues,
    setFormValues
  );

  const handleInputChange = manejarCambioDeEntrada(setFormValues);
  const handleToggleChange = manejarCambioDeEstado(setFormValues);

  const manejarEntradas = {
    handleInputChange,
    handleToggleChange,
  };

  const envio = paraEnvio(formValues);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Asegúrate de prevenir la acción predeterminada del formulario

    // Validación de Contraseña solo si existen los campos 'password' y 'confirm_password'
    if (
      formValues.password &&
      formValues.confirm_password &&
      formValues.password !== formValues.confirm_password
    ) {
      toast.error("Las contraseñas no coinciden", {
        duration: 4000,
        icon: "🔒",
      });
      return; // 🔑 DETIENE el submit
    }

    await manejarEnvio(event, envio.link, formValues, crear, null, envio.entityId, {
      ...envio.params,
    });
    clearCache();
  };

  const fields = construirCampos(formValues, manejarEntradas);

  return (
    <EntityForm
      valorsForm={formValues}
      manejarEnviar={handleSubmit}
      fields={fields}
      esLoading={false}
      paraNavegacion={paraNavegacion}
    />
  );
}
