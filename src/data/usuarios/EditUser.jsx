import {
  useRoles,
  useUserMutations,
  useUser,
  useDepartamentos,
  useInstituciones,
} from "../../hooks/useEntities";
import { InputField } from "../../components/shared/InputField";
import { ToggleSwitch } from "../../components/shared/ToggleSwitch";
import { SelectField } from "../../components/shared/SelectField";
import { CheckBox } from "../../components/shared/CheckBox";
import {
  FaBackspace,
  FaEdit,
  FaEye,
  FaPencilAlt,
  FaPlus,
} from "react-icons/fa";
import EditEntity from "../../components/shared/EditEntity";
import { useFormEntity } from "../../utils/useFormEntity";
import { obtenerIdUser } from "../../utils/auth";

export default function EditUser() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };  

  const rolesOptions = () =>
    paraSelectsdestructuringYMap(useRoles, true, "id", "name");

  const departamentoOptions = () =>
    paraSelectsdestructuringYMap(
      useDepartamentos,
      true,
      "id",
      "nombre"
    );

    const institucionOptions = () =>
    paraSelectsdestructuringYMap(
      useInstituciones,
      true,
      "id_institucion",
      "razon_social"
    );

  const configuracionFormulario = (entidad) => ({
    first_name: entidad?.first_name || "",
    last_name: entidad?.last_name || "",
    username: entidad?.username || "",
    email: entidad?.email || "",
    birthday: entidad?.birthday || "",
    role: entidad?.role || "",
    is_active: entidad?.is_active || false,
    departamento: entidad?.departamento || "",
    institucion: entidad?.institucion || "",

  });

  const camposExtras = (formValues) => ({
    role: Number(formValues.role),
    departamento: Number(formValues.departamento),
    institucion: Number(formValues.institucion),
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id,
    link: "/userList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nombres",
      name: "first_name",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Apellidos",
      name: "last_name",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Nueva Contraseña",
      type: "password",
      name: "new_password",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Nombre de usuario",
      name: "username",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Correo Electronico",
      name: "email",
      type: "email",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha de Nacimiento",
      name: "birthday",
      type: "date",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Rol",
      name: "role",
      onChange: manejarEntradas.handleInputChange,
      options: rolesOptions(),
      actionButtons: [
        {
          to: `/editRol/${formValues.role}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/createRol",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/rolList",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
    },
    {
      component: SelectField,
      label: "Departamento",
      name: "departamento",
      onChange: manejarEntradas.handleInputChange,
      options: departamentoOptions(),
      actionButtons: [
        {
          to: `/editDepartament/${formValues.departamento}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/createDepartament",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/departamentList",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
    },
    {
      component: ToggleSwitch,
      label: "Estado del Usuario",
      name: "is_active",
      checked: formValues.is_active,
      onChange: manejarEntradas.handleToggleChange("is_active"),
    },
    {
      component: CheckBox,
      label: "Es admininstrador",
      name: "is_superuser",
      checked: formValues.is_superuser,
      onChange: manejarEntradas.handleToggleChange("is_superuser"),
    },
    {
      component: SelectField,
      label: "Institucion",
      name: "institucion",
      onChange: manejarEntradas.handleInputChange,
      options: institucionOptions(),
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
    title: "Editar Usuario",
    subTitle: "Modifique los datos del usuario si es necesario",
    icon: FaEdit,
    actions: [
      {
        to: "/userList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "border-2 border-gray-400 text-gray-700 hover:text-white hover:bg-gray-700 p-1 gap-2",
      },
    ],
  };

  return (
    <EditEntity
      useEntityMutations={useUserMutations}
      useEntity={useUser}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
