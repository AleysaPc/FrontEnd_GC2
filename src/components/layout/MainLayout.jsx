import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar"; // Importamos Navbar directamente
import { useState } from "react";

const MainLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible); // Alterna la visibilidad del Sidebar
  };

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "sessionClosed" && event.newValue === "true") {
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isVisible={sidebarVisible} />
      
      <div className="flex-1 flex flex-col h-screen">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="max-w-7xl mx-auto bg-white border-2 rounded-lg shadow-sm min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
