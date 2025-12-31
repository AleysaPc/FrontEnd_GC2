// components/test/TestDerivar.jsx
import Modal from "../../../components/shared/Modal";
import {
  useAccionCorrespondenciaMutations,
  useUsers,
} from "../../../hooks/useEntities";
import { useFormEntity } from "../../../utils/useFormEntity";
import { UserDropdownSelect } from "../../../components/shared/UserDropdownSelect";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import CreateEntity from "../../../components/shared/CreateEntity";
import { FaShareSquare } from "react-icons/fa";

export default function TestDerivar({ isOpen, onClose, id }) {
  const {
    data: usuariosData,
    isLoading: loadingUsuarios,
    error: errorUsuarios,
  } = useUsers({ all_data: true }); //hace un request al backend y trae todos los usu

  const usuariosArray = usuariosData?.data || []; // es un array de objetos de usuario.
  const { options } = useFormEntity();

  //Aquí options es una función (definida en useFormEntity) que transforma tu array de usuarios en un array de opciones para el dropdown
  const usuarioOptions = () =>
    usuariosArray ? options(usuariosArray, "id", "email",) : [];
    console.log("Opciones de usuarios destino:", usuarioOptions());

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
    correspondencia_id: id, // ID de la correspondencia a derivar
    usuario_destino_id: null, // usuario destino (un solo valor)
    comentario_derivacion: "", // comentario opcional
    accion: "derivado", // acción por defecto
    //estado_resultante: "derivado", // estado resultante
  };

  const camposExtras = (formValues) => ({
    usuarios: formValues.usuarios,
    usuario_destino_id: formValues.usuario_destino_id
      ? Number(formValues.usuario_destino_id)
      : null,
    comentario_derivacion: formValues.comentario_derivacion,
    accion: formValues.accion,
    //estado_resultante: formValues.estado_resultante,
  });

  const paraEnvio = (formValues) => ({
      link: "/correspondenciaRecibidaList",
      data: {
        ...camposExtras(formValues),
        usuario_destino_id: formValues.usuario_destino_id,
      }
    });

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
          actions: [], 
        }}
      />
    </Modal>
  );
}
