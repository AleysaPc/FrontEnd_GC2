import { InputField } from "../../components/shared/InputField"
import EditEntity from "../../components/shared/EditEntity"
import { useInstituciones, useContactoMutations, useContacto, useInstitucionMutations, useInstitucion } from "../../hooks/useEntities"
import { FaBackspace, FaEdit, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa"
import { useFormEntity } from "../../utils/useFormEntity"
import { obtenerIdUser } from "../../utils/auth"

export default function EditInstitucion() {
  const configuracionFormulario = (entidad) => ({
    razon_social: entidad?.data?.razon_social || "",
    direccion: entidad?.data?.direccion || "",
    telefono: entidad?.data?.telefono || "",
    fecha_fundacion: entidad?.data?.fecha_fundacion || "",
  });

  const camposExtras = (formValues) => ({
    razon_social: formValues.razon_social,
    direccion: formValues.direccion,
    telefono: formValues.telefono,
    fecha_fundacion: formValues.fecha_fundacion,
  })
  const paraEnvio = (formValues) => ({
    entityId: formValues.id_institucion,
    link: -1,
    params: camposExtras(formValues),
  })

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Razon Social",
      name: "razon_social",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Direccion",
      name: "direccion",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Telefono",
      name: "telefono",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha Fundacion",
      name: "fecha_fundacion",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
  ]
  const paraNavegacion = {
    title : "Editar Institucion",
    subTitle : "Formulario para editar institucion",
    icon : FaEdit,
    actions : [
        {
            to : -1,
            label : "Volver",
            icon : FaBackspace,
            estilos : "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
        },
    ]
  }
  return (
    <EditEntity
        useEntityMutations={useInstitucionMutations}
        useEntity={useInstitucion}
        configForm={configuracionFormulario}
        paraEnvio={paraEnvio}
        construirCampos={construirCampos}
        paraNavegacion={paraNavegacion}
    />
  );
}   
