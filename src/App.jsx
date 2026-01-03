import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./router/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import '@fontsource/roboto/400.css'; // Peso normal
import '@fontsource/roboto/500.css'; // Peso medio
import '@fontsource/roboto/700.css'; // Peso bold
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <AuthProvider>
          <Routes>
            {/* Todas las rutas se gestionan dentro de AppRoutes */}
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
