import { lazy } from "react";

const EditInstitucion = lazy(() =>
  import("../data/institucion/EditInstitucion")
);
const CreateInstitucion = lazy(() =>
  import("../data/institucion/CreateInstitucion")
);

export const contactoRoutes = [
  { path: "/editInstitucion/:id", element: <EditInstitucion /> },
  { path: "/createInstitucion", element: <CreateInstitucion /> },
];

    