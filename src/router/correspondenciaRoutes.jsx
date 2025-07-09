import { lazy } from "react";

const CorrespondenciaList = lazy(() => import("../data/correspondencia/correspondencia/CorrespondenciaList"));
const CreateCorrespondencia = lazy(() => import("../data/correspondencia/correspondencia/createCorrespondencia"));
const CorrespondenciaRecibidaList = lazy(() => import("../data/correspondencia/correspondencia/CorrespondenciaRecibidaList"));
const CorrespondenciaEnviadaList = lazy(() => import("../data/correspondencia/correspondencia/CorrespondenciaEnviadaList"));
const EditCorrespondencia = lazy(() => import("../data/correspondencia/correspondencia/editCorrespondencia"));
const CreateRecibida = lazy(() => import("../data/correspondencia/correspondenciaRecibida/CreateRecibida"));
const DetailRecibida = lazy(() => import("../data/correspondencia/correspondenciaRecibida/DetailRecibida"));
const CreateDocSaliente = lazy(() => import("../data/correspondencia/correspondenciaSaliente/CreateDocSaliente"));
const DetailDocSaliente = lazy(() => import("../data/correspondencia/correspondenciaSaliente/DetailDocSaliente"));
const EditRecibida = lazy(() => import("../data/correspondencia/correspondenciaRecibida/EditRecibida"))
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

    path : "/detailRecibida/:id",
    element: <DetailRecibida />,
  },
  {

    path : "/detailDocSaliente/:id",
    element: <DetailDocSaliente />,
  },
  {
    path: "/createDocSaliente",
    element: <CreateDocSaliente />,
  },
  {
    path: "/editRecibida/:id",
    element: <EditRecibida />,
  }
    
];