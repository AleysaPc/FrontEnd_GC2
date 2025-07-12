import { lazy } from "react";

const EditInstitucion = lazy(() =>
  import("../data/institucion/EditInstitucion")
);
const CreateInstitucion = lazy(() =>
  import("../data/institucion/CreateInstitucion")
);
const InstitucionList = lazy(() =>
  import("../data/institucion/InstitucionList")
);

export const contactoRoutes = [
  { path: "/editInstitucion/:id", element: <EditInstitucion /> },
  { path: "/createInstitucion", element: <CreateInstitucion /> },
  { path: "/institucionList", element: <InstitucionList /> },
];

    