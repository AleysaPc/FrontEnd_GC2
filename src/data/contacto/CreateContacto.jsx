import { InputField } from "../../components/shared/InputField";
import CreateEntity from "../../components/shared/CreateEntity";
import { useContactoMutations } from "../../hooks/useEntities";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../utils/useFormEntity";
import { obtenerIdUser } from "../../utils/auth";
import { SelectField } from "../../components/shared/SelectField";
import { useInstituciones } from "../../hooks/useEntities";

export default function CreateContacto() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };
  const institucionOptions = () =>
    paraSelectsdestructuringYMap(
      useInstituciones,
      true,
      "id_institucion",
      "razon_social"
    );
  const configuracionFormulario = {
    nombre_contacto: "",
    apellido_pat_contacto: "",
    apellido_mat_contacto: "",
    titulo_profesional: "",
    cargo: "",
    email: "",
    telefono: "",
    id_institucion: "",
  };
  const camposExtras = (formValues) => ({
    institucion: formValues.id_institucion ? Number(formValues.id_institucion) : null,
  });

  const paraEnvio = (formValues) => ({
    link: "/contactoList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nombre",
      name: "nombre_contacto",
      type: "text",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Apellido Paterno",
      name: "apellido_pat_contacto",
      type: "text",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
        component: InputField,
        label: "Apellido Materno",
        name: "apellido_mat_contacto",
        type: "text",
        required: true,
        onChange: manejarEntradas.handleInputChange,
    },
    {
        component: InputField,
        label:"Titulo Profesional",
        name:"titulo_profesional",
        type:"text",
        required:true,
        onChange: manejarEntradas.handleInputChange,
    },
    {
        component: InputField,
        label:"Cargo",
        name:"cargo",
        type:"text",
        required:true,
        onChange: manejarEntradas.handleInputChange,
    },
    {
        component: InputField,
        label:"Email",
        name:"email",
        type:"email",
        required:true,
        onChange: manejarEntradas.handleInputChange,
    },
    {
        component: InputField,
        label:"Telefono",
        name:"telefono",
        type:"text",
        required:true,
        onChange: manejarEntradas.handleInputChange,
    },
    {
        component: SelectField,
        label:"Institucion",
        name:"id_institucion",
        options: institucionOptions(),
        onChange: manejarEntradas.handleInputChange,
        actionButtons: [
            {
                to: "/editInstitucion",
                icon: FaPencilAlt,
                estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
            },
            {
                to: "/addInstitucion",
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
    title: "Registrar Contacto",
    subTitle: "Contacto",
    icon: FaPlus,
    actions: [
      {
        to: "/contactoList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "bg-red-800 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return (
    <>
      <CreateEntity
        useEntityMutations={useContactoMutations}
        configForm={configuracionFormulario}
        paraEnvio={paraEnvio}
        construirCampos={construirCampos}
        paraNavegacion={paraNavegacion}
      />
    </>
  );
}
