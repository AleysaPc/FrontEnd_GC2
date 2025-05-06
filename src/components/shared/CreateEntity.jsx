import  EntityForm  from "./EntityForm";
import { useFormEntity } from "../../utils/useFormEntity";
import { useState } from "react";

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

  const handleInputChange = manejarCambioDeEntrada(setFormValues);
  const handleToggleChange = manejarCambioDeEstado(setFormValues);

  const manejarEntradas = {
    handleInputChange,
    handleToggleChange,
  };

  const envio = paraEnvio(formValues);

  const handleSubmit = (event) => {
    event.preventDefault(); // Asegúrate de prevenir la acción predeterminada del formulario

     // Validación de Contraseña solo si existen los campos 'password' y 'confirm_password'
  if ((formValues.password ?? false) && (formValues.confirm_password ?? false)) {
    if (formValues.password !== formValues.confirm_password) {
      alert("Las contraseñas no coinciden.");
      return;
    }
  }

    manejarEnvio(event, envio.link, formValues, crear, null, envio.entityId, {
      ...envio.params,
    });
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