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

export default function TestDerivar({ isOpen, onClose, id }) {
  const { paraSelectsdestructuringYMap } = useAccionCorrespondenciaMutations();
  const { data: response } = useCorrespondencia(id);
  const correspondencia = response?.data;

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
    {id: "derivado", nombre: "Derivado"},
    {id: "observado", nombre: "Observado"},
    {id: "aprobado", nombre: "Aprobado"},
    {id: "rechazado", nombre: "Rechazado"},
    {id: "devuelto", nombre: "Devuelto"},
    {id: "archivado", nombre: "Archivado"},
  ];

  const configuracionFormulario = {
    correspondencia_id: id,
    usuarios: [],
    comentario_derivacion: "",
    accion: "",
  };

  const camposExtras = (formValues) => ({
    usuarios: Array.isArray(formValues.usuarios)
      ? formValues.usuarios.map(Number)
      : [],
    comentario_derivacion: formValues.comentario_derivacion || "",
    nro_registro: formValues.nro_registro || "",
  });

  const paraEnvio = (formValues) => {
    const idInt = parseInt(id);
    return {
      link: "/correspondenciaRecibidaList",
      data: {
        ...camposExtras(formValues),
        correspondencia_id: idInt,
        comentario_derivacion: formValues.comentario_derivacion || "",
      },
    };
  };

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: SelectField,
      label: "Acción",
      name: "accion",
      options: accionOptions,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: UserDropdownSelect,
      label: "Derivar a:",
      name: "usuarios",
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
