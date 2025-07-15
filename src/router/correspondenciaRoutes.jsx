import { lazy } from "react";

const CorrespondenciaList = lazy(() =>
  import("../data/correspondencia/correspondencia/CorrespondenciaList")
);
const CreateCorrespondencia = lazy(() =>
  import("../data/correspondencia/correspondencia/createCorrespondencia")
);
const CorrespondenciaRecibidaList = lazy(() =>
  import("../data/correspondencia/correspondenciaRecibida/CorrespondenciaRecibidaList")
);
const CorrespondenciaEnviadaList = lazy(() =>
  import("../data/correspondencia/correspondenciaEnviada/CorrespondenciaEnviadaList")
);
const EditCorrespondencia = lazy(() =>
  import("../data/correspondencia/correspondencia/EditCorrespondencia")
);
const CreateRecibida = lazy(() =>
  import("../data/correspondencia/correspondenciaRecibida/CreateRecibida")
);
const DetailRecibida = lazy(() =>
  import("../data/correspondencia/correspondenciaRecibida/DetailRecibida")
);
const CreateDocSaliente = lazy(() =>
  import("../data/correspondencia/correspondenciaEnviada/CreateEnviada")
);
const DetailDocSaliente = lazy(() =>
  import("../data/correspondencia/correspondenciaEnviada/DetailDocSaliente")
);
const EditRecibida = lazy(() =>
  import("../data/correspondencia/correspondenciaRecibida/EditRecibida")
);
const CreateContacto = lazy(() => import("../data/contacto/createContacto"));
const ContactoList = lazy(() => import("../data/contacto/ContactoList"));
const EditContacto = lazy(() => import("../data/contacto/EditContacto"));
const CreateElaborada = lazy(() => import("../data/correspondencia/correspondenciaElaborada/CreateElaborada"));
const ElaboradaList = lazy(() => import("../data/correspondencia/correspondenciaElaborada/ElaboradaList"));
const VistaPreviaDocumento = lazy(() => import("../data/correspondencia/correspondenciaElaborada/VistaPreviaDocumento"));
const VistaPdfDocumento = lazy(() => import("../data/correspondencia/correspondenciaElaborada/VistaPdfDocumento"));
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
    path: "/createCorrespondencia",
    element: <CreateCorrespondencia />,
  },
  {
    path: "/editCorrespondencia/:id",
    element: <EditCorrespondencia />,
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
    path: "/detailDocSaliente/:id",
    element: <DetailDocSaliente />,
  },
  {
    path: "/createDocSaliente",
    element: <CreateDocSaliente />,
  },
  {
    path: "/editRecibida/:id",
    element: <EditRecibida />,
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
  }
];
