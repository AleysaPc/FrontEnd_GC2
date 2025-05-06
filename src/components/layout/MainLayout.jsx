
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
    <div className="h-full overflow-visible">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex h-full overflow-visible">
        <Sidebar isVisible={sidebarVisible} />
        <div className="border-orange-400 border-2 rounded-lg mx-4 mt-2 mb-3 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
