import { lazy } from "react";

const CorrespondenciaList = lazy(() =>
  import("../data/correspondencia/correspondencia/CorrespondenciaList")
);
const CorrespondenciaRecibidaList = lazy(() =>
  import("../data/correspondencia/correspondenciaRecibida/CorrespondenciaRecibidaList")
);
const CorrespondenciaEnviadaList = lazy(() =>
  import("../data/correspondencia/correspondenciaEnviada/CorrespondenciaEnviadaList")
);
const CreateRecibida = lazy(() =>
  import("../data/correspondencia/correspondenciaRecibida/CreateRecibida")
);
const DetailRecibida = lazy(() =>
  import("../data/correspondencia/correspondenciaRecibida/DetailRecibida")
);
//Sería registroDocEnviado
const DetailEnviada = lazy(() =>
  import("../data/correspondencia/correspondenciaEnviada/DetailEnviada")
);
const EditRecibida = lazy(() =>
  import("../data/correspondencia/correspondenciaRecibida/EditRecibida")
);
const CreateContacto = lazy(() => import("../data/contacto/CreateContacto"));
const ContactoList = lazy(() => import("../data/contacto/ContactoList"));
const EditContacto = lazy(() => import("../data/contacto/EditContacto"));
const CreateElaborada = lazy(() => import("../data/correspondencia/correspondenciaElaborada/CreateElaborada"));
const ElaboradaList = lazy(() => import("../data/correspondencia/correspondenciaElaborada/ElaboradaList"));
const VistaPreviaDocumento = lazy(() => import("../data/correspondencia/correspondenciaElaborada/VistaPreviaDocumento"));
const VistaPdfDocumento = lazy(() => import("../data/correspondencia/correspondenciaElaborada/VistaPdfDocumento"));
const RegistroEnviado = lazy(() => import("../data/correspondencia/correspondenciaEnviada/RegistroEnviado"));
const EditEnviada = lazy(() => import("../data/correspondencia/correspondenciaEnviada/EditEnviada"));
const Derivar = lazy(() => import("../data/correspondencia/correspondencia/Derivar"));
const TestDerivar = lazy(() => import("../data/correspondencia/correspondencia/TestDerivar"));
export const correspondenciaRoutes = [
  // rutas de correspondencia
  {
    path: "/correspondenciaList",
    element: <CorrespondenciaList />,
  },
  {
    path: "/correspondenciaRecibidaList",
    element: <CorrespondenciaRecibidaList />,
  },
  {
    path: "/correspondenciaEnviadaList",
    element: <CorrespondenciaEnviadaList />,
  },
  {
    path: "/editEnviada/:id",
    element: <EditEnviada />,
  },
  {
    path: "/createRecibida",
    element: <CreateRecibida />,
  },
  {
    path: "/detailRecibida/:id",
    element: <DetailRecibida />,
  },
 {
  path: "/detailEnviada/:id",
  element: <DetailEnviada />,
 },
  {
    path: "/editEnviada/:id",
    element: <EditEnviada />,
  },
  {
    path: "/createContacto",
    element: <CreateContacto />,
  },
  {
    path: "/contactoList",
    element: <ContactoList />,
  },
  {
    path: "/editContacto/:id",
    element: <EditContacto />,
  },
  {
    path: "/createElaborada",
    element: <CreateElaborada />,
  },
  {
    path: "/elaboradaList",
    element: <ElaboradaList />,
  },
  {
    path: "/vistaPreviaDocumento/:id_correspondencia",
    element: <VistaPreviaDocumento />,
  },
  {
    path: "/vistaPdfDocumento/:id_correspondencia",
    element: <VistaPdfDocumento />,
  },
  {
    path: "/registroEnviado",
    element: <RegistroEnviado />,
  },
  {
    path: "/editEnviada/:id",
    element: <EditEnviada />,
  },
  {
    path:"editRecibida/:id",
    element:<EditRecibida/>
  },
  {
    path:"derivar/:id",
    element:<Derivar/>
  },
  {
    path:"testDerivar/:id",
    element:<TestDerivar/>
  }
];
