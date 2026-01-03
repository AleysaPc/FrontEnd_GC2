import {
  useCorrespondenciaElaboradaMutations,
  useCorrespondenciaElaborada,
  useContactos,
  useUsers,
} from "../../../hooks/useEntities";

import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";

import { InputField } from "../../../components/shared/InputField";
import { MultipleInputs } from "../../../components/shared/MultipleInputs";
import { ToggleSwitch } from "../../../components/shared/ToggleSwitch";
import { SelectField } from "../../../components/shared/SelectField";
import { TextAreaField } from "../../../components/shared/TextAreaField";
import { UserDropdownSelect } from "../../../components/shared/UserDropdownSelect";

import EditEntity from "../../../components/shared/EditEntity";
import { FaBackspace, FaFile, FaPlus, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function RegisterEnviada() {
  const { id } = useParams();
  const { options } = useFormEntity();

  const { data: correspondenciaData } = useCorrespondenciaElaborada(id);
  const cite = correspondenciaData?.data?.cite || "";

  // Datos del usuario logeado
  const idUsuario = obtenerIdUser();

  // Usuarios
  const { data: usuariosData } = useUsers({ all_data: true });
  const usuariosArray = usuariosData?.data || [];

  // Contactos
  const { data: contactosData } = useContactos({ all_data: true });
  const contactosArray = contactosData?.data || [];

  // Todos los usuarios como opciones de destino
  const usuariosDestinoOptions = usuariosArray.map((user) => ({
    id: user.id,
    nombre: user.email,
  }));

  const contactoOptions = () =>
    options(contactosArray, "id_contacto", "nombre_completo");

  const usuarioOptions = () => options(usuariosArray, "id", "email");

  const opcion_EstadoEntrega = [
    { id: "pendiente", nombre: "Pendiente" },
    { id: "entregado", nombre: "Entregado" },
    { id: "no_entregado", nombre: "No entregado" },
    { id: "devuelto", nombre: "Devuelto" },
    { id: "rechazado", nombre: "Rechazado" },
    { id: "extraviado", nombre: "Extraviado" },
    { id: "direccion_incorrecta", nombre: "Dirección incorrecta" },
    { id: "destinatario_incorrecto", nombre: "Destinatario incorrecto" },
  ];

  // Cambiar estado desde el toggle
  const manejarEstadoToggle = (checked, manejarEntradas) => {
    manejarEntradas.handleInputChange({
      target: {
        name: "estado",
        value: checked ? "enviado" : "borrador",
      },
    });
  };

  const configuracionFormulario = (entidad) => ({
    fecha_envio: entidad?.data?.fecha_envio || "",
    hora_envio: entidad?.data?.hora_envio || "",
    fecha_recepcion: entidad?.data?.fecha_recepcion || "",
    fecha_seguimiento: entidad?.data?.fecha_seguimiento || "",
    referencia: entidad?.data?.referencia || "",
    descripcion: entidad?.data?.descripcion || "",
    paginas: entidad?.data?.paginas || "",
    comentario: entidad?.data?.comentario || "",
    comentario_derivacion: "",
    contacto: entidad?.data?.contacto || "",
    documentos: Array.isArray(entidad?.data?.documentos)
      ? entidad.data.documentos
      : [],
    cite: entidad?.data?.cite || "",
    estado: entidad?.data?.estado || "",
    estado_entrega: entidad?.data?.estado_entrega || "pendiente",
    motivo_no_entrega: entidad?.data?.motivo_no_entrega || "",
    fecha_intento_entrega: entidad?.data?.fecha_intento_entrega || "",
    numero_intentos: entidad?.data?.numero_intentos || 0,
    usuario_destino_id: null,
    usuarios: [],
  });

  const camposExtras = (form) => {
    const usuariosDestino = form.usuario_destino_id
      ? Array.isArray(form.usuario_destino_id)
        ? form.usuario_destino_id.map(Number)
        : [Number(form.usuario_destino_id)]
      : [];

    return {
      contacto: Number(form.contacto),
      usuario: idUsuario,
      comentario: form.comentario,
      estado_entrega: form.estado_entrega,
      motivo_no_entrega: form.motivo_no_entrega,
      fecha_intento_entrega: form.fecha_intento_entrega,
      numero_intentos: Number(form.numero_intentos),
      comentario_derivacion: form.comentario_derivacion || "",
      usuario_destino_id: usuariosDestino,
      usuarios: usuariosDestino,
    };
  };

  const paraEnvio = (form) => ({
    entityId: form.id_correspondencia,
    link: "/correspondenciaEnviadaList",
    params: camposExtras(form),
  });

  const construirCampos = (form, manejarEntradas) => [
    // --- Grupo: Fechas ---
    {
      component: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Envío */}
          <div className="flex flex-col gap-1">
            <label>Fecha y hora de envío</label>
            <div className="flex gap-2">
              <InputField
                name="fecha_envio"
                type="datetime-local"
                required
                value={form.fecha_envio}
                onChange={manejarEntradas.handleInputChange}
              />
            </div>
          </div>
          {/* Recepción */}
          <div className="flex flex-col gap-1">
            <label>Fecha y hora de recepción</label>
            <div className="flex gap-2">
              <InputField
                name="fecha_recepcion"
                type="datetime-local"
                value={form.fecha_recepcion}
                onChange={manejarEntradas.handleInputChange}
              />
            </div>
          </div>
          {/* Seguimiento */}
          <div className="flex flex-col gap-1">
            <label>Fecha de seguimiento</label>
            <InputField
              name="fecha_seguimiento"
              type="datetime-local"
              value={form.fecha_seguimiento}
              onChange={manejarEntradas.handleInputChange}
            />
          </div>
        </div>
      ),
    },

    // --- Estado entrega ---
    {
      component: () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectField
            label="Estado de Entrega"
            name="estado_entrega"
            options={opcion_EstadoEntrega}
            value={form.estado_entrega}
            onChange={manejarEntradas.handleInputChange}
          />

          <InputField
            name="fecha_intento_entrega"
            label="Fecha intento"
            type="datetime-local"
            value={form.fecha_intento_entrega}
            onChange={manejarEntradas.handleInputChange}
          />

          <InputField
            name="numero_intentos"
            label="N° Intentos"
            type="number"
            min={0}
            value={form.numero_intentos}
            onChange={manejarEntradas.handleInputChange}
          />
        </div>
      ),
    },

    // Toggle
    {
      component: ToggleSwitch,
      label: "Registrar oficialmente",
      name: "estado_toggle",
      checked: form.estado === "enviado",
      onChange: (checked) => manejarEstadoToggle(checked, manejarEntradas),
    },

    // Motivo no entrega
    {
      component: TextAreaField,
      label: "Motivo de no entrega",
      name: "motivo_no_entrega",
      value: form.motivo_no_entrega,
      onChange: manejarEntradas.handleInputChange,
    },

    // Documentos
    {
      component: MultipleInputs,
      label: "Documento",
      name: "documentos",
      type: "file",
      onChange: manejarEntradas.handleInputChange,
    },

    // Derivar
    {
      component: UserDropdownSelect,
      label: "Derivar a:",
      name: "usuario_destino_id",
      options: usuariosDestinoOptions,
      onChange: (name, value) =>
        manejarEntradas.handleToggleChange(name)(value),
    },

    // Comentario derivación
    {
      component: TextAreaField,
      label: "Comentario",
      name: "comentario_derivacion",
      value: form.comentario_derivacion,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: `Correspondencia Enviada - CITE: ${cite}`,
    icon: FaFile,
    actions: [
      {
        to: "/listEnviados",
        label: " Cancelar",
        icon: FaTimes,
        estilos:
          "border-white-700 rounded-lg bg-green-700 text-white p-2 hover:bg-red-700 hover:text-white-600"
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
