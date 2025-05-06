import useLogout from "../../hooks/useLogout";
import { FaBars, FaUser } from "react-icons/fa";
import Dropdown from "../shared/Dropdown";
import { ActionButton } from "../shared/ActionButton";

const Navbar = ({ toggleSidebar }) => {
  const logoutUser = useLogout();

  return (
    <nav className="sticky top-2 z-50 bg-white border-gray-400 border-2 rounded-lg mx-4 mt-2 flex justify-between p-4">
      <ActionButton
        icon={FaBars}
        onClick={toggleSidebar}
        estilos="border-2 border-gray-400 rounded-lg p-1"
      />
      <ActionButton label={"Navbar"} to={"/home"} />

      {/* {sidebarToggle && (
        <div>
          <Link to="/">Inicio</Link>
          <Link to="/acerca">Acerca</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
      )} */}
      <div className="flex items-center">
        <Dropdown
          icon={FaUser}
          options={[
            {
              label: "Mi Perfil",
            },
            {
              label: "Cerrar Sesión",
              action: logoutUser,
            },
          ]}
        />
      </div>
    </nav>
  );
};

export default Navbar;