// components/test/TestDerivar.jsx
import Modal from "../../../components/shared/Modal";
import {
  useAccionCorrespondenciaMutations,
  useCustomUserList,
} from "../../../hooks/useEntities";
import { UserDropdownSelect } from "../../../components/shared/UserDropdownSelect";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import CreateEntity from "../../../components/shared/CreateEntity";
import { FaShareSquare } from "react-icons/fa";

const ACCIONES_CON_DESTINO_OBLIGATORIO = ["derivado", "devuelto"];
const ACCIONES_SIN_DESTINO = ["archivado"];

export default function TestDerivar({ isOpen, onClose, id }) {
  const {
    data: usuariosData,
    isLoading: loadingUsuarios,
    error: errorUsuarios,
  } = useCustomUserList({ all_data: true });

  const usuariosArray = usuariosData?.data || [];

  const usuarioOptions = () =>
    usuariosArray.map((u) => ({
      id: u.id,
      nombre: `${u.first_name || ""} ${u.last_name || ""} - ${u.nombre_departamento || ""}`,
    }));

  const accionOptions = [
    { id: "derivado", nombre: "Derivado" },
    { id: "observado", nombre: "Observado" },
    { id: "aprobado", nombre: "Aprobado" },
    { id: "rechazado", nombre: "Rechazado" },
    { id: "devuelto", nombre: "Devuelto" },
    { id: "archivado", nombre: "Archivado" },
  ];

  const configuracionFormulario = {
    correspondencia_id: id,
    usuario_destino_id: [],
    comentario_derivacion: "",
    accion: "derivado",
  };

  const normalizarUsuariosDestino = (value) => {
    if (Array.isArray(value)) {
      return value.map(Number).filter(Boolean);
    }
    return value ? [Number(value)] : [];
  };

  const camposExtras = (formValues) => {
    const usuariosDestino = ACCIONES_SIN_DESTINO.includes(formValues.accion)
      ? []
      : normalizarUsuariosDestino(formValues.usuario_destino_id);

    return {
      correspondencia_id: id,
      usuario_destino_id: usuariosDestino,
      comentario_derivacion: formValues.comentario_derivacion,
      accion: formValues.accion,
    };
  };

  const paraEnvio = (formValues) => ({
    link: "/correspondenciaRecibidaList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => {
    const requiereDestino = ACCIONES_CON_DESTINO_OBLIGATORIO.includes(
      formValues.accion,
    );
    const permiteDestino = !ACCIONES_SIN_DESTINO.includes(formValues.accion);

    const campos = [
      {
        component: SelectField,
        label: "Accion",
        name: "accion",
        options: accionOptions,
        value: formValues.accion,
        onChange: (event) => {
          manejarEntradas.handleInputChange(event);
          manejarEntradas.handleToggleChange("usuario_destino_id")([]);
        },
      },
    ];

    if (permiteDestino) {
      campos.push({
        component: UserDropdownSelect,
        label: requiereDestino ? "Destino (obligatorio):" : "Destino (opcional):",
        name: "usuario_destino_id",
        value: formValues.usuario_destino_id,
        options: usuarioOptions(),
        onChange: (name, value) =>
          manejarEntradas.handleToggleChange(name)(value),
        isLoading: loadingUsuarios,
        error: errorUsuarios,
      });
    }

    campos.push({
      component: InputField,
      label: "Comentario",
      name: "comentario_derivacion",
      value: formValues.comentario_derivacion,
      required: false,
      onChange: manejarEntradas.handleInputChange,
    });

    return campos;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateEntity
        useEntityMutations={useAccionCorrespondenciaMutations}
        configForm={configuracionFormulario}
        paraEnvio={paraEnvio}
        construirCampos={construirCampos}
        paraNavegacion={{
          title: "Acciones",
          subTitle: "",
          icon: FaShareSquare,
          actions: [],
        }}
      />
    </Modal>
  );
}
