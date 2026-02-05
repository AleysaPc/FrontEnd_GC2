import { lazy } from "react";

const CorrespondenciaList = lazy(() =>
  import("../data/correspondencia/correspondencia/CorrespondenciaList")
);
const CorrespondenciaRecibidaList = lazy(() =>
  import(
    "../data/correspondencia/correspondenciaRecibida/CorrespondenciaRecibidaList"
  )
);
const CorrespondenciaEnviadaList = lazy(() =>
  import(
    "../data/correspondencia/correspondenciaEnviada/CorrespondenciaEnviadaList"
  )
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
const CreateElaborada = lazy(() =>
  import("../data/correspondencia/correspondenciaElaborada/CreateElaborada")
);
const ElaboradaList = lazy(() =>
  import("../data/correspondencia/correspondenciaElaborada/ElaboradaList")
);
const VistaPreviaDocumento = lazy(() =>
  import(
    "../data/correspondencia/correspondenciaElaborada/VistaPreviaDocumento"
  )
);
const VistaPdfDocumento = lazy(() =>
  import("../data/correspondencia/correspondenciaElaborada/VistaPdfDocumento")
);
const ListEnviados = lazy(() =>
  import("../data/correspondencia/correspondenciaEnviada/ListEnviados")
);
const EditElaborada = lazy(() =>
  import("../data/correspondencia/correspondenciaElaborada/EditElaborada")
);
const TestDerivar = lazy(() =>
  import("../data/correspondencia/correspondencia/TestDerivar")
);
const RegisterEnviada = lazy(() =>
  import("../data/correspondencia/correspondenciaEnviada/RegisterEnviada")
);
const DetailUser = lazy(() => import("../data/usuarios/DetailUser"));
const DetailContacto = lazy(() => import("../data/contacto/DetailContacto"));
const HistorialDocumento = lazy(() =>
  import("../components/shared/HistorialDocumento")
);
const HojaDeRuta = lazy(()=>import("../components/shared/HojadeRuta"));
const InternalCorrespondenceList = lazy(()=>import("../data/correspondencia/correspondenciaElaborada/InternalCorrespondenceList"));
const ExternalCorrespondenceList = lazy(()=>import("../data/correspondencia/correspondenciaElaborada/ExternalCorrespondenceList"))
const CorrespondenciaEnviadaListInternal = lazy(()=>import("../data/correspondencia/correspondenciaEnviada/CorrespondenciaEnviadaListInternal"))
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
    path: "/correspondenciaEnviadaListInternal",
    element: <CorrespondenciaEnviadaListInternal />,
  },
  {
    path: "/registerEnviada/:id",
    element: <RegisterEnviada />,
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
    path: "/editElaborada/:id",
    element: <EditElaborada />,
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
    path: "/listEnviados",
    element: <ListEnviados />,
  },
  {
    path: "/editElaborada/:id",
    element: <EditElaborada />,
  },
  {
    path: "editRecibida/:id",
    element: <EditRecibida />,
  },
  {
    path: "testDerivar/:id",
    element: <TestDerivar />,
  },
  {
    path: "detailUser/:id",
    element: <DetailUser />,
  },
  {
    path: "detailContacto/:id",
    element: <DetailContacto />,
  },
  {
    path: "historial/:id",
    element: <HistorialDocumento />,
  },
  {
    path: "hojaDeRuta/:id",
    element: <HojaDeRuta />,
  },
  {
    path: "internalCorrespondenceList",
    element: <InternalCorrespondenceList/>
  },
  {
    path: "externalCorrespondenceList",
    element: <ExternalCorrespondenceList/>
  },
];
