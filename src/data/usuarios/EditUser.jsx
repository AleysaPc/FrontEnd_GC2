import {
    useAlmacenes,
    useRoles,
    useUserMutations,
    useUser,
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
  
  export default function EditUser() {
    const { paraSelectsdestructuringYMap } = useFormEntity();
  
    const almacenOptions = () =>
      paraSelectsdestructuringYMap(
        useAlmacenes,
        true,
        "id_almacen_tienda",
        "nombre"
      );
  
    const rolesOptions = () =>
      paraSelectsdestructuringYMap(useRoles, true, "id", "name");
  
    const selects = {
      almacenOptions,
      rolesOptions,
    };
  
    const configuracionFormulario = (entidad) => ({
      first_name: entidad?.data?.first_name || "",
      last_name: entidad?.data?.last_name || "",
      username: entidad?.data?.username || "",
      email: entidad?.data?.email || "",
      birthday: entidad?.data?.birthday || "",
      lugar_de_trabajo: entidad?.data?.lugar_de_trabajo || "",
      role: entidad?.data?.role || "",
      is_active: entidad?.data?.is_active || false,
    });
  
    const camposExtras = (formValues) => ({
      lugar_de_trabajo: Number(formValues.lugar_de_trabajo),
      role: Number(formValues.role),
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
        label: "Lugar de Trabajo",
        name: "lugar_de_trabajo",
        onChange: manejarEntradas.handleInputChange,
        options: selects.almacenOptions(),
        actionButtons: [
          {
            to: "/editCategory",
            icon: FaPencilAlt,
            estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
          },
          {
            to: "/addCategory",
            icon: FaPlus,
            estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
          },
          {
            to: "/categoryList",
            icon: FaEye,
            estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
          },
        ],
      },
      {
        component: SelectField,
        label: "Rol",
        name: "role",
        onChange: manejarEntradas.handleInputChange,
        options: selects.rolesOptions(),
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