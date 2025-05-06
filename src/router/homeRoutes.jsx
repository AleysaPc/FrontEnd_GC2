import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));

export const homeRoutes = [{ path: "/home", element: <Home /> }];