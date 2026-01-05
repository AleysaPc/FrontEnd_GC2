import { useFormEntity } from "../../utils/useFormEntity";
import {
  useRolesList,
  useUserMutations,
  useInstituciones,
  useDepartamentoSelect,
} from "../../hooks/useEntities";
import { InputField } from "../../components/shared/InputField";
import { SelectField } from "../../components/shared/SelectField";
import { ToggleSwitch } from "../../components/shared/ToggleSwitch";
import { CheckBox } from "../../components/shared/CheckBox";
import SelectorDual from "../../components/shared/SelectorDual";
import ImagePreview from "../../components/shared/ImagePreview";
import { FaArrowLeft, FaPlus, FaEye } from "react-icons/fa";
import CreateEntity from "../../components/shared/CreateEntity";
import { data } from "react-router-dom";

export default function CreateUser() {
  const { data: roles } = useRolesList({ all_data: true });
  const rolesData = roles?.data || [];

  // Llamar los hooks directamente en el nivel superior
  const { data: departamentosData } = useDepartamentoSelect({ all_data: true });
  const { data: institucionesData } = useInstituciones({ all_data: true });

  const institucionOptions =
    institucionesData?.data?.map((item) => ({
      //aqui data tambien es la clave
      id: item.id_institucion,
      nombre: item.razon_social,
    })) || [];

  const departamentoOptions =
    departamentosData?.data?.map((item) => ({
      //aqui data tambien es la clave
      id: item.id,
      nombre: item.nombre,
    })) || [];

  // Configuración inicial del formulario
  const configForm = {
    first_name: "",
    secund_name: "",
    last_name: "",
    secund_last_name: "",
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
    id_rol: "",
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
      options: institucionOptions,
      onChange: manejarEntradas.handleInputChange,
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
      name: "id_departamento",
      required: false,
      options: departamentoOptions,
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
