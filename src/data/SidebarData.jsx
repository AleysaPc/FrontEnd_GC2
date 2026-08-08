import { FaBarcode, FaBars, FaChartLine, FaFileMedical, FaUser } from "react-icons/fa";
import { RiArchiveDrawerFill, RiContactsBookFill } from "react-icons/ri";
import { IoCreateSharp } from "react-icons/io5";
import { BarChart } from "recharts";

export const menus = [
  {
    title: "Nuevo Registro",
    icon: FaFileMedical,
    roleRequired: ["Secretaria", "Directivo", "Administrador"],
    items: [
      { label: "Recibido", path: "/createRecibida", },
      { label: "Enviado", path: "/listEnviados", },
    ],
  },

  {
    title: "Crear Documento",
    icon: IoCreateSharp,
    roleRequired: ["Secretaria", "Directivo"],
    items: [
      { label: "Nuevo", path: "/createElaborada" },
      { label: "Lista Interno", path: "/internalCorrespondenceList" },
      { label: "Lista Externos", path: "/externalCorrespondenceList" },
    ],
  },

  {
    title: "Registros Oficiales",
    icon: RiArchiveDrawerFill,
    roleRequired: ["Secretaria", "Directivo", "Administrador", "Afiliado"],
    items: [
      { label: "Recibidos", path: "/correspondenciaRecibidaList", roleRequired: ["Afiliado", "Secretaria", "Directivo"] },
      { label: "Enviados Externos", path: "/correspondenciaEnviadaList" , roleRequired: ["Secretaria", "Directivo"]},
      {
        label: "Enviados Internos",
        path: "/correspondenciaEnviadaListInternal", roleRequired: ["Secretaria", "Directivo"],
      },
      { label: "Correspondencias", path: "/correspondenciaList", roleRequired: ["Secretaria", "Directivo"] },
    ],
  },

  {
    title: "Contactos",
    icon: RiContactsBookFill,
    roleRequired: ["Administrador", "Secretaria", "Directivo"],
    items: [
      { label: "Lista de contactos", path: "/contactoList" },
      { label: "Crear Contacto", path: "/createContacto" },
      { label: "Lista de instituciones", path: "/institucionList" },
      { label: "Crear institucion", path: "/createInstitucion" },
    ],
  },

  {
    title: "Usuarios",
    icon: FaUser,
    roleRequired: ["Administrador", "Secretaria"],
    items: [
      { label: "Lista de Usuarios", path: "/userList" },
      { label: "Nuevo Usuario", path: "/createUser" },
      { label: "Lista de roles", path: "/rolList" },
      { label: "Crear rol", path: "/createRol" },
      { label: "Lista de departamentos", path: "/departamentList" },
      { label: "Crear departamento", path: "/createDepartament" },
    ],
  },

  {
    title: "Estadísticas",
    icon: FaChartLine,
    items: [{label: "Estadísticas",path: "/dashboard",} ],
  },
];
