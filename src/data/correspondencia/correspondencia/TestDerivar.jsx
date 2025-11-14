// components/test/TestDerivar.jsx
import Modal from "../../../components/shared/Modal";
import {
  useAccionCorrespondenciaMutations,
  useUsers,
  useCorrespondencia,
} from "../../../hooks/useEntities";
import { useFormEntity } from "../../../utils/useFormEntity";
import { UserDropdownSelect } from "../../../components/shared/UserDropdownSelect";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import CreateEntity from "../../../components/shared/CreateEntity";
import { FaShareSquare } from "react-icons/fa";
import { cloneElement } from "react";

export default function TestDerivar({ isOpen, onClose, id }) {
  
  const {
    data: usuariosData,
    isLoading: loadingUsuarios,
    error: errorUsuarios,
  } = useUsers({ all_data: true });

  const usuariosArray = usuariosData?.data || [];
  const { options } = useFormEntity();

  const usuarioOptions = () =>
    usuariosArray ? options(usuariosArray, "id", "email") : [];

  //De acuerdo al modelo
  const accionOptions = [
    { id: "derivado", nombre: "Derivado" },
    { id: "observado", nombre: "Observado" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },
    { id: "devuelto", nombre: "Devuelto" },
    { id: "archivado", nombre: "Archivado" },
  ];

  const configuracionFormulario = {
    correspondencia: id,
    usuario_destino_id,
    comentario_derivacion: "",
    accion: "",
  };

  const camposExtras = (formValues) => ({
    usuario_destino_id: formValues.usuario_destino_id
      ? formValues.usuario_destino_id.map((id) => Number(id))
      : [],
    comentario_derivacion: formValues.comentario_derivacion,
    accion: formValues.accion,
  });

  const paraEnvio = (formValues) => {
    console.log("formValues al enviar:", formValues);
    const data = {
      ...camposExtras(formValues),
      accion: formValues.accion,
    };
    if (formValues.usuario_destino_id && formValues.usuario_destino_id.length > 0) {
      data.usuario_destino_id = Number(formValues.usuario_destino_id[0]);
    }

    console.log("data que se envía:", data);
    return {
      link: "/correspondenciaRecibidaList",
      data: data,
    };
  };

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: SelectField,
      label: "Acción",
      name: "accion",
      options: accionOptions,
      value: formValues.accion,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: UserDropdownSelect,
      label: "Derivar a:",
      name: "usuario_destino_id",
      value: formValues.usuario_destino_id,
      options: usuarioOptions(),
      onChange: (name, value) =>
        manejarEntradas.handleToggleChange(name)(value),
      isLoading: loadingUsuarios,
      error: errorUsuarios,
    },
    {
      component: InputField,
      label: "Comentario",
      name: "comentario_derivacion",
      value: formValues.comentario_derivacion,
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateEntity
        useEntityMutations={useAccionCorrespondenciaMutations}
        configForm={configuracionFormulario}
        paraEnvio={paraEnvio}
        construirCampos={construirCampos}
        paraNavegacion={{
          title: `Derivar`,
          subTitle: "",
          icon: FaShareSquare,
          actions: [], // No necesitas botones extra en el modal
        }}
      />
    </Modal>
  );
}
