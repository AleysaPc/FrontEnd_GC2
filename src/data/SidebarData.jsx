import { FaFileMedical, FaUser } from "react-icons/fa";
import { RiArchiveDrawerFill, RiContactsBookFill } from "react-icons/ri";
import { IoCreateSharp } from "react-icons/io5";

export const menus = [
  {
    title: "Nuevo Registro",
    icon: FaFileMedical,
    items: [
      { label: "Recibido", path: "/createRecibida" },
      { label: "Enviado", path: "/registroEnviado" },
    ],
   //roleRequired: "Cajero",
  },
  {
    title: "Registros",
    icon: RiArchiveDrawerFill,
    items: [
      { label: "Correspondencias", path: "/correspondenciaList" },
      { label: "Recibidos", path: "/correspondenciaRecibidaList" },
      { label: "Enviados", path: "/correspondenciaEnviadaList" },
      
    ],
  },
  {
    title: "Crear Documento",
    icon: IoCreateSharp,
    items: [
      { label: "Nuevo", path: "/createElaborada" },
      { label: "Lista Documentos elaborados", path: "/elaboradaList" },
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
