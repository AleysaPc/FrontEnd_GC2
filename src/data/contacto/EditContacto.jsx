
import { InputField } from "../../components/shared/InputField"
import { SelectField } from "../../components/shared/SelectField"
import EditEntity from "../../components/shared/EditEntity"
import { useInstituciones, useContactoMutations, useContacto } from "../../hooks/useEntities"
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa"
import { useFormEntity } from "../../utils/useFormEntity"
import { obtenerIdUser } from "../../utils/auth"


export default function EditContacto() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const {
      data: institucionData,
      isLoading: loadingInstituciones,
      error: errorInstituciones,
    } = useInstituciones({ all_data: true });
    const institucionesArray = institucionData?.data || [];
  
    const { options } = useFormEntity();
  
    const institucionOptions = () =>
      institucionesArray
        ? options(institucionesArray, "id_institucion", "razon_social")
        : [];


//Hace referencia al modelo contacto
  const configuracionFormulario = (entidad) => ({
    nombre_contacto: entidad?.nombre_contacto || "",
    apellido_pat_contacto: entidad?.apellido_pat_contacto || "",
    apellido_mat_contacto: entidad?.apellido_mat_contacto || "",
    titulo_profesional: entidad?.titulo_profesional || "",
    cargo: entidad?.cargo || "",
    email: entidad?.email || "",
    telefono: entidad?.telefono || "",
    institucion: entidad?.institucion || "",

  });

  const camposExtras = (formValues) => ({
    institucion: Number(formValues.institucion),
    usuario: logicaNegocio.idUsuario,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id_contacto,
    link: "/contactoList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nombre",
      name: "nombre_contacto",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Apellido Paterno",
      name: "apellido_pat_contacto",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Apellido Materno",
      name: "apellido_mat_contacto",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Titulo Profesional",
      name: "titulo_profesional",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Cargo",
      name: "cargo",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Email",
      name: "email",
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
      component: SelectField,
      label: "Institucion",
      name: "institucion",
      options: institucionOptions(),
      onChange: manejarEntradas.handleInputChange,
      actionButtons: [
        {
          to: `/editInstitucion/${formValues.institucion}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/createInstitucion",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/institucionList",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
    },
  ];

  const paraNavegacion = {
    title : "Editar Contacto",
    subTitle : "Formulario para editar contacto",
    icon : FaPlus,
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
        useEntityMutations={useContactoMutations}
        useEntity={useContacto}
        configForm={configuracionFormulario}
        paraEnvio={paraEnvio}
        construirCampos={construirCampos}
        paraNavegacion={paraNavegacion}
    />
  );
}
