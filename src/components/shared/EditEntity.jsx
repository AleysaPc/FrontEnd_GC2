import { useParams } from "react-router-dom";
import { useFormEntity } from "../../utils/useFormEntity";
import EntityForm from "./EntityForm";
import { useState } from "react";

export default function EditEntity({
  useEntityMutations,
  useEntity,
  configForm,
  paraEnvio,
  construirCampos,
  paraNavegacion,
}) {
  const { id } = useParams(); // Obtiene el parámetro 'id' de la URL utilizando useParams();

  const {
    crearEstadoFomulario,
    manejarCambioDeEntrada,
    manejarCambioDeEstado,
    manejarEnvio,
    usarEfecto,
  } = useFormEntity();

  const { data: entidad, isLoading } = useEntity(id);

  const { actualizar } = useEntityMutations();

  const [formValues, setFormValues] = useState(
    crearEstadoFomulario(configForm(entidad))
  );

  usarEfecto(entidad, setFormValues, {
    //pasamos objeto con campos adicionales
  });

  const handleInputChange = manejarCambioDeEntrada(setFormValues);
  const handleToggleChange = manejarCambioDeEstado(setFormValues);

  const manejarEntradas = {
    handleInputChange,
    handleToggleChange,
  };

  const envio = paraEnvio(formValues);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formValues.new_password ?? false) {
      formValues.new_password = formValues.new_password;
    }
    manejarEnvio(
      event,
      envio.link,
      formValues,
      null,
      actualizar,
      envio.entityId,
      { ...envio.params }
    );
  };

  const fields = construirCampos(formValues, manejarEntradas);

  return (
    <EntityForm
      valorsForm={formValues}
      manejarEnviar={handleSubmit}
      fields={fields}
      esLoading={isLoading}
      entityId={envio.entityId}
      paraNavegacion={paraNavegacion}
    />
  );
}