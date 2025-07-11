import { lazy } from "react";

const EditInstitucion = lazy(() =>
  import("../data/institucion/EditInstitucion")
);

export const contactoRoutes = [
  { path: "/editInstitucion/:id", element: <EditInstitucion /> },
];
    