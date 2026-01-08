import { useFormEntity } from "../../utils/useFormEntity";
import {
  useRoles,
  useUserMutations,
  useInstituciones,
  useDepartamentos,
} from "../../hooks/useEntities";
import { InputField } from "../../components/shared/InputField";
import { SelectField } from "../../components/shared/SelectField";
import { ToggleSwitch } from "../../components/shared/ToggleSwitch";
import { CheckBox } from "../../components/shared/CheckBox";
import { FaArrowLeft, FaPlus, FaEye } from "react-icons/fa";
import CreateEntity from "../../components/shared/CreateEntity";
import ImagePreview from "../../components/shared/ImagePreview";

export default function CreateUser() {
  const { options } = useFormEntity();
  const { paraSelectsdestructuringYMap } = useFormEntity();

  // Selects
  const departamentosOptions = paraSelectsdestructuringYMap(
    useDepartamentos,
    true,
    "id",
    "nombre"
  );
  //Institución
  const {
    data: institucionesData,
    isLoading: loadingInstituciones,
    error: errorInstituciones,
  } = useInstituciones({ all_data: true });

  //Rol
  const { data: roleData } = useRoles({ all_data: true });
  const rolesOptions = roleData?.data
    ? options(roleData.data, "id", "name")
    : [];

  const institucionesArray = institucionesData?.data || [];

  const institucionOptions = () =>
    institucionesArray
      ? options(institucionesArray, "id_institucion", "razon_social")
      : [];

  // Configuración inicial del formulario
  const configForm = {
    first_name: "",
    second_name: "",
    last_name: "",
    second_last_name: "",
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirm_password: "",
    is_active: false,
    is_superuser: false,
    documento_identidad: "",
    lugar_nacimiento: "",
    direccion: "",
    cargo: "",
    telefono: "",
    celular: "",
    institucion: "",
    id_institucion: "",
    id_roles: "",
    id_departamento: "",
    notes: "",
    imagen: "",
  };

  // Datos adicionales para envío
  const camposExtras = (formValues) => ({
    rol: formValues.id_rol ? Number(formValues.id_rol) : null,
    departamento: formValues.id_departamento
      ? Number(formValues.id_departamento)
      : null,
    institucion: formValues.id_institucion
      ? Number(formValues.id_institucion)
      : null,
    imagen: formValues.imagen || null,
  });

  const paraEnvio = (formValues) => ({
    link: "/userList",
    params: camposExtras(formValues),
  });

  // Construcción de campos
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
      component: InputField,
      label: "Correo Electrónico",
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
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Contraseña",
      name: "password",
      type: "password",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Confirmar Contraseña",
      name: "confirm_password",
      type: "password",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Rol",
      name: "id_roles",
      options: rolesOptions,
      onChange: manejarEntradas.handleInputChange,
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
      component: SelectField,
      label: "Institucion",
      name: "id_institucion",
      options: institucionOptions(),
      onChange: manejarEntradas.handleInputChange,
      isLoading: loadingInstituciones,
      error: errorInstituciones,
      actionButtons: [
        {
          to: "/CreateInstitucion",
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
      component: SelectField,
      label: "Departamento",
      name: "id_departamento",
      required: false,
      options: departamentosOptions,
      onChange: manejarEntradas.handleInputChange,
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
    title: "Crear Usuario",
    subTitle: "Formulario completo para registrar un usuario",
    icon: FaPlus,
    actions: [
      {
        to: -1,
        label: "Volver",
        icon: FaArrowLeft,
        estilos:
          "bg-white hover:bg-blue-600 text-black px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };

  return (
    <CreateEntity
      useEntityMutations={useUserMutations}
      configForm={configForm}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
