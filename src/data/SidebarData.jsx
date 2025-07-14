import { FaFileMedical, FaUser } from "react-icons/fa";
import { RiArchiveDrawerFill, RiContactsBookFill } from "react-icons/ri";
import { IoCreateSharp } from "react-icons/io5";

export const menus = [
  {
    title: "Nuevo Registro",
    icon: FaFileMedical,
    items: [
      { label: "Recibido", path: "/createRecibida" },
      { label: "Enviado", path: "/createDocSaliente" },
    ],
    roleRequired: "Cajero",
  },
  {
    title: "Registros",
    icon: RiArchiveDrawerFill,
    items: [
      { label: "Correspondencia", path: "/correspondenciaList" },
      { label: "Bandeja de Entrada", path: "/correspondenciaRecibidaList" },
      { label: "Bandeja de Salida", path: "/correspondenciaEnviadaList" },
    ],
  },
  {
    title: "Crear Documento",
    icon: IoCreateSharp,
    items: [
      { label: "Externo", path: "/ver_movimientos" },
      { label: "Interno", path: "/ver_movimientos" },
      { label: "En revisión", path: "/ver_movimientos" },
    ],
  },
  {
    title: "Contactos",
    icon: RiContactsBookFill,
    items: [
      { label: "Lista de contactos", path: "/contactoList" },
      { label: "Nuevo Contacto", path: "/createContacto" },
    ],
  },
  {
    title: "Usuarios",
    icon: FaUser,
    items: [{ label: "Lista de Usuarios", path: "/userList" },
      { label: "Nuevo Usuario", path: "/createUser" },
    ],
  },
];
