import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "./ProtectedRoute";//
import MainLayout from "../components/layout/MainLayout";//
import PublicLayout from "../components/layout/PublicLayout";
import { authRoutes } from "./authRoutes";//
import { homeRoutes } from "./homeRoutes";//
import { usuariosRoutes } from "./usuariosRoutes";//
import { correspondenciaRoutes } from "./correspondenciaRoutes";

const FallbackComponent = () => <div>Hubo un error al cargar la página</div>;

const rutasPublicas = [...authRoutes];
const rutasPrivadas = [
  ...homeRoutes,//... tres puntos para indicar que hay mas cosas adelante 
  ...usuariosRoutes,
  ...correspondenciaRoutes,
];

const AppRoutes = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Suspense
        fallback={<div className="spinner">Cargando Pagina Espere</div>}
      >
        <Routes>
          {/* Rutas publicas - PADRE*/}
          <Route element={<PublicLayout />}> 
            {rutasPublicas.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              {rutasPrivadas.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </Route>
          {/* Ruta para manejar páginas no encontradas */}
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;