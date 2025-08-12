import {
  useCorrespondenciaElaboradaMutations,
  useCorrespondenciaElaborada,
} from "../../../hooks/useEntities";
import { useContactos } from "../../../hooks/useEntities";
import { useFormEntity } from "../../../utils/useFormEntity";
import { obtenerIdUser } from "../../../utils/auth";
import { InputField } from "../../../components/shared/InputField";
import EditEntity from "../../../components/shared/EditEntity";
import { FaBackspace, FaPlus } from "react-icons/fa";
import { MultipleInputs } from "../../../components/shared/MultipleInputs";
import { useParams } from "react-router-dom";
import { ToggleSwitch } from "../../../components/shared/ToggleSwitch";

export default function RegisterEnviada() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const { id } = useParams(); // Asegúrate de tener el ID desde la URL
  const { data: correspondenciaData, isLoading } =
    useCorrespondenciaElaborada(id);
  const cite = correspondenciaData?.data?.cite || "";

  const {
    data: contactosData,
    isLoading: loadingContactos,
    error: errorContactos,
  } = useContactos({ all_data: true });
  const contactosArray = contactosData?.data || [];

  const { options } = useFormEntity();

  const contactoOptions = () =>
    contactosArray
      ? options(contactosArray, "id_contacto", "nombre_completo")
      : [];

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  // Esta función intercepta el cambio del toggle para actualizar estado
  const manejarEstadoToggle = (checked, manejarEntradas) => {
    manejarEntradas.handleInputChange({
      target: {
        name: "estado",
        value: checked ? "enviado" : "borrador",
      },
    });
  };

  const configuracionFormulario = (entidad) => ({
    //Modelo 3 - Correspondencia
    fecha_envio: entidad?.data?.fecha_envio || "",
    hora_envio: entidad?.data?.hora_envio || "",
    fecha_recepcion: entidad?.data?.fecha_recepcion || "",
    fecha_seguimiento: entidad?.data?.fecha_seguimiento || "",
    referencia: entidad?.data?.referencia || "",
    descripcion: entidad?.data?.descripcion || "",
    paginas: entidad?.data?.paginas || "",
    comentario: entidad?.data?.comentario || "",
    contacto: entidad?.data?.contacto || "", //Es el nombre del FK que tiene conectado con la correspondencia
    documentos: Array.isArray(entidad?.data?.documentos)
      ? entidad.data.documentos
      : [],
    cite: entidad?.data?.cite || "",
    estado: entidad?.data?.estado || "", 
  });

  const camposExtras = (formValues) => ({
    contacto: Number(formValues.contacto),
    usuario: logicaNegocio.idUsuario,
    comentario: formValues.comentario,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id_correspondencia, //del modelo correspondencia
    link: "/correspondenciaEnviadaList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: ({ value, ...props }) => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4 items-start">
          {/* Grupo: Fecha y hora de envío */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Fecha y hora de envío del documento
            </label>
            <div className="flex gap-2">
              <InputField
                name="fecha_envio"
                type="date"
                required={true}
                value={formValues.fecha_envio || ""}
                onChange={manejarEntradas.handleInputChange}
                className="flex-1"
              />
              <InputField
                name="hora_envio"
                type="time"
                required={true}
                value={formValues.hora_envio || ""}
                onChange={manejarEntradas.handleInputChange}
                className="flex-1"
              />
            </div>
          </div>

          {/* Grupo: Fecha y hora de recepción */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Fecha y hora de recepción
            </label>
            <div className="flex gap-2">
              <InputField
                name="fecha_recepcion"
                type="date"
                required={true}
                value={formValues.fecha_recepcion || ""}
                onChange={manejarEntradas.handleInputChange}
                className="flex-1"
              />
              <InputField
                name="hora_recepcion"
                type="time"
                required={true}
                value={formValues.hora_recepcion || ""}
                onChange={manejarEntradas.handleInputChange}
                className="flex-1"
              />
            </div>
          </div>

          {/* Grupo: Fecha de seguimiento */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Fecha de seguimiento
            </label>
            <InputField
              name="fecha_seguimiento"
              type="date"
              required={false}
              value={formValues.fecha_seguimiento || ""}
              onChange={manejarEntradas.handleInputChange}
              className="w-full"
            />
          </div>
        </div>
      ),
      name: "fecha_envio",
    },
    {
      component: ToggleSwitch,
      label: "Registrar oficialmente",
      name: "estado_toggle", // nombre interno para el toggle (no guardamos este campo en el backend)
      checked: formValues.estado === "enviado", // true si estado es enviado
      onChange: (checked) => manejarEstadoToggle(checked, manejarEntradas),
    }, 
    {
      component: MultipleInputs,
      label: "Documento",
      name: "documentos",
      type: "file",
      onChange: manejarEntradas.handleInputChange,
    },
  ];
  const paraNavegacion = {
    title: `Registrar Correspondencia Enviada - CITE: ${cite}`,
    subTitle: "",
    icon: FaPlus,
    actions: [
      {
        to: "/listEnviados",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
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
