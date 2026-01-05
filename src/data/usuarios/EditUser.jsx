import {
  useUserMutations,
  useUser,
  useRolesList,
  useDepartamentos,
  useInstituciones,
  useDepartamentoSelect,
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
import ImagePreview from "../../components/shared/ImagePreview";
import SelectorDual from "../../components/shared/SelectorDual";
import { useFormEntity } from "../../utils/useFormEntity";

export default function EditUser() {
  const { data: rolesData } = useRolesList({ all_data: true });

  // Llamar los hooks directamente en el nivel superior
  const { data: departamentosData } = useDepartamentoSelect({ all_data: true });
  const { data: institucionesData } = useInstituciones({ all_data: true });

  const institucionOptions =
    institucionesData?.data?.map((item) => ({ //aqui data tambien es la clave
      id: item.id_institucion,
      nombre: item.razon_social,
    })) || [];

  const departamentoOptions =
    departamentosData?.data?.map((item) => ({ //aqui data tambien es la clave
      id: item.id,
      nombre: item.nombre,
    })) || [];

  // Configuración inicial del formulario con datos de la entidad
  const configuracionFormulario = (entidad) => ({
    first_name: entidad?.data?.first_name || "",
    secund_name: entidad?.data?.secund_name || "",
    last_name: entidad?.data?.last_name || "",
    secund_last_name: entidad?.data?.secund_last_name || "",
    username: entidad?.data?.username || "",
    email: entidad?.data?.email || "",
    birthday: entidad?.data?.birthday || "",
    documento_identidad: entidad?.data?.documento_identidad || "",
    lugar_nacimiento: entidad?.data?.lugar_nacimiento || "",
    direccion: entidad?.data?.direccion || "",
    cargo: entidad?.data?.cargo || "",
    telefono: entidad?.data?.telefono || "",
    celular: entidad?.data?.celular || "",
    rol: entidad?.data?.rol || "",
    institucion: entidad?.data?.institucion || "",
    departamento: entidad?.data?.departamento || "",
    is_active: entidad?.data?.is_active || false,
    is_superuser: entidad?.data?.is_superuser || false,
    notes: entidad?.notes || "",
    new_password: "",
    imagen: entidad?.data?.imagen || null,
  });

  // Datos adicionales para envío
  const camposExtras = (formValues) => ({
    departamento: Number(formValues.departamento),
    institucion: Number(formValues.institucion),
    rol: formValues.rol,
    imagen: formValues.imagen || null,
    new_password: formValues.new_password || undefined,
  });

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
      name: "secund_name",
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
      name: "secund_last_name",
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
      component: SelectorDual,
      data: rolesData?.data, //esta parte es la clave de data
      value: formValues.roles,
      onChange: (ids) => {
        manejarEntradas.handleInputChange({
          target: {
            name: "roles",
            value: ids,
          },
        });
      },
      labelLeft: "Roles Disponibles",
      labelRight: "Roles Seleccionados",
      itemLabel: "name", // campo de la data de permisos nombre
      label: "Roles",
      name: "roles",
    },
    {
      component: SelectField,
      label: "Departamento",
      name: "departamento",
      options: departamentoOptions,
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
      options: institucionOptions,
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
          <div className="font-medium text-gray-700">Imagen actual</div>
          <ImagePreview
            image={formValues.imagen}
            alt={`Imagen de ${formValues.nombre || "producto"}`}
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
