import React from "react";
import useLogout from "../../hooks/useLogout";
import { FaUser, FaPrint } from "react-icons/fa";
import Dropdown from "../shared/Dropdown";
import Notificaciones from "../shared/Notificaciones";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { createApiInstance } from "../../api/api.Base"; // ✅ tu instancia con token

const Navbar = ({ toggleSidebar, user }) => {
  const logoutUser = useLogout();
  const api = createApiInstance();

  const handleGenerarPreSello = async () => {
    try {
      const { data } = await api.post("/correspondencia/generar_pre_sello/");

      // 🔐 Guardar pre-sello localmente
      const preSellos = JSON.parse(localStorage.getItem("preSellos")) || [];
      preSellos.push(data);
      localStorage.setItem("preSellos", JSON.stringify(preSellos));

      const doc = new jsPDF();

      // Página
      const pageWidth = doc.internal.pageSize.getWidth();

      // Sello
      const selloX = pageWidth - 100;
      const selloY = 8;
      const selloWidth = 90;

      // Marco azul
      doc.setDrawColor(0, 0, 180);
      doc.rect(selloX, selloY, selloWidth, 55);

      // Colores y posición
      doc.setTextColor(0, 0, 180);
      const textX = selloX + 5;
      const centerX = selloX + selloWidth / 2;
      let y = selloY + 10;

      // 🏛️ Institución (centrado + negrita)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("FEDERACIÓN LA PAZ", centerX, y, { align: "center" });
      y += 8;

      // 📅 Fecha
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(
        `Fecha/Hora: ${new Date(data.fecha_generacion).toLocaleString()}`,
        textX,
        y
      );
      y += 8;

      // 🔢 Nro Registro (centrado + negrita)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text(`N° ${data.pre_nro_registro}`, centerX, y, { align: "center" });
      y += 14;

      // ✍️ Firma
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("Firma: ____________________", textX, y);

      // Abrir PDF
      window.open(URL.createObjectURL(doc.output("blob")));

      window.open(URL.createObjectURL(doc.output("blob")));
    } catch (err) {
      console.error(err);
      alert("Error al generar pre-sello");
    }
  };

  return (
    <nav className="bg-green-700 text-white flex justify-between items-center p-3 sticky top-0 z-50 shadow-md h-16">
      <button
        className="p-2 hover:bg-red-600 rounded"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <div className="text-lg font-semibold">
        <Link to="/home" aria-label="Ir al inicio">
          Sistema de Gestión de Correspondencia
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Notificaciones />
        <Dropdown
          icon={FaUser}
          label={user?.email || "Usuario"}
          options={[
            { label: "Mi Perfil" },
            { label: "Cerrar Sesión", action: logoutUser },
          ]}
        />
        <button
          onClick={handleGenerarPreSello}
          className="p-2 hover:bg-green-600 rounded"
          title="Imprimir último sello"
        >
          <FaPrint />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
