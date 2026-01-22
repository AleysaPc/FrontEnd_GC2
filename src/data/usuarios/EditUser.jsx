import {
  useRolesList,
  useUserMutations,
  useUser,
  useDepartamentoList,
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
import ImagePreview from "../../components/shared/ImagePreview";

export default function EditUser() {
  const { paraSelectsdestructuringYMap } = useFormEntity();
  const { options } = useFormEntity();
  // Opciones para selects

  const {
    data: rolesData,
    isLoading: loadingRoles,
    error: errorRoles,
  } = useRolesList({ all_data: true });
  const rolesArray = rolesData?.data || [];

  const {
    data: institucionData,
    isLoading: loadingInstituciones,
    error: errorInstituciones,
  } = useInstituciones({ all_data: true });
  const institucionesArray = institucionData?.data || [];

  const {
    data: departamentosData,
    isLoading: loadingDepartamentos,
    error: errorDepartamentos,
} = useDepartamentoList({ all_data: true });

  const departamentosArray = departamentosData?.data || [];
  const institucionOptions = () =>
    institucionesArray
      ? options(institucionesArray, "id_institucion", "razon_social")
      : [];

  const rolesOptions = () =>
    rolesArray ? options(rolesArray, "id", "name") : [];

  const departamentosOptions = () =>
    departamentosArray ? options(departamentosArray, "id", "nombre") : [];

  // Configuración inicial del formulario con datos de la entidad
  const configuracionFormulario = (entidad) => ({
    first_name: entidad?.first_name || "",
    second_name: entidad?.second_name || "",
    last_name: entidad?.last_name || "",
    second_last_name: entidad?.second_last_name || "",
    username: entidad?.username || "",
    email: entidad?.email || "",
    birthday: entidad?.birthday || "",
    documento_identidad: entidad?.documento_identidad || "",
    lugar_nacimiento: entidad?.lugar_nacimiento || "",
    direccion: entidad?.direccion || "",
    cargo: entidad?.cargo || "",
    telefono: entidad?.telefono || "",
    celular: entidad?.celular || "",
    roles: entidad?.roles || "",
    id_roles: entidad?.roles_id || "",
    institucion: entidad?.institucion || "",
    departamento: entidad?.departamento || "",
    is_active: entidad?.is_active || false,
    is_superuser: entidad?.is_superuser || false,
    notes: entidad?.notes || "",
    new_password: "",
    imagen: entidad?.imagen || null,
  });

  // Datos adicionales para envío
  const camposExtras = (formValues) => {
    // Obtener el ID del rol seleccionado
    const rolId = Number(formValues.roles);

    return {
      departamento: Number(formValues.departamento),
      institucion: Number(formValues.institucion),
      // Envía un array de objetos con el formato que espera el backend
      roles: rolId ? [{ id: rolId }] : [],
      new_password: formValues.new_password || undefined,
      imagen: formValues.imagen || null,
    };
  };
  const paraEnvio = (formValues) => ({
    entityId: formValues.id,
    link: "/userList",
    params: camposExtras(formValues),
  });

  // Campos del formulario
  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Primer nombre",
      name: "first_name",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Segundo nombre",
      name: "second_name",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Apellido paterno",
      name: "last_name",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Apellido materno",
      name: "second_last_name",
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
      label: "Correo Electrónico",
      name: "email",
      type: "email",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Contraseña nueva",
      name: "new_password",
      type: "password",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha de Nacimiento",
      name: "birthday",
      type: "date",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Documento de identidad",
      name: "documento_identidad",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Lugar de nacimiento",
      name: "lugar_nacimiento",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Dirección",
      name: "direccion",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Cargo",
      name: "cargo",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Teléfono",
      name: "telefono",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Celular",
      name: "celular",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Rol",
      name: "roles",
      options: rolesOptions(),
      formValue: formValues.roles,
      onChange: manejarEntradas.handleInputChange,
      actionButtons: [
        {
          to: `/editRol/${formValues.id}`,
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
      options: departamentosOptions(),
      formValue: formValues.departamento,
      onChange: manejarEntradas.handleInputChange,
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
      component: SelectField,
      label: "Institución",
      name: "institucion",
      options: institucionOptions(),
      formValue: formValues.institucion,
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
    {
      component: ToggleSwitch,
      label: "Estado del Usuario",
      name: "is_active",
      checked: formValues.is_active,
      onChange: manejarEntradas.handleToggleChange("is_active"),
    },
    {
      component: CheckBox,
      label: "Es administrador",
      name: "is_superuser",
      checked: formValues.is_superuser,
      onChange: manejarEntradas.handleToggleChange("is_superuser"),
    },
    {
      component: InputField,
      label: "Observaciones",
      name: "notes",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      name: "imagen",
      component: () => (
        <div className="space-y-2">
          <div className="font-medium text-gray-700">
            Imagen Actual
            <ImagePreview
              image={formValues.imagen}
              alt={`Imagen de ${formValues.nombre || "imagen"}`}
              className="h-40 w-40 mb-4"
            />
            <InputField
              label="Cambiar imagen"
              name="imagen"
              type="file"
              accept="image/*"
              onChange={manejarEntradas.handleInputChange}
            />
          </div>
        </div>
      ),
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
          "bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
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
