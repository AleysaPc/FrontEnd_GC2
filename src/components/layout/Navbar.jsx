import useLogout from "../../hooks/useLogout";
import { FaUser, FaPrint } from "react-icons/fa";
import Dropdown from "../shared/Dropdown";
import Notificaciones from "../shared/Notificaciones";
import Alertas from "../shared/Alertas"
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { createApiInstance } from "../../api/api.Base"; // ✅ tu instancia con token
import { useEffect, useState} from "react";


const Navbar = ({ toggleSidebar, user }) => {
  const logoutUser = useLogout();
  const api = createApiInstance();

  //Estado par amostra el número actual-siguiente
  const [registroInfo, setRegistroInfo] = useState(null);

  //Obtener proximo número de registro
  const obtenerProximoRegistro = async () => {
    try {
      const { data } = await api.get(
        "/correspondencia/proximo_nro_registro/"
      );
      setRegistroInfo(data);

    } catch (error) {
      console.error(
        "Error obteniendo próximo registro:",
        error
      );
    }
  };
  //Ejecutar al cargar el navar
  useEffect(() => {
    obtenerProximoRegistro();
  },[]);

  const handleGenerarPreSello = async () => {
    const confirmado = window.confirm(
      "¿Confirma la generación del sello de correspondencia?\n\n" +
        "Esta acción generará un nuevo número de registro y no podrá deshacerse."
    );

    if (!confirmado) return;

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
      const selloY = 26;
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
        {
          registroInfo && (
            <span className="text-xs text-green-100">
              Próximo registro:{" "}
              <strong>
                {registroInfo.siguiente}
              </strong>
            </span>
          )
        }
      </div>

      <div className="flex items-center space-x-4">
        <Notificaciones /> {/*Campana para derivaciones */}
        <Alertas /> {/* 🕐 Campana para alertas */}
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
