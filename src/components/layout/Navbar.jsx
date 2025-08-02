import useLogout from '../../hooks/useLogout'
import { FaBars, FaEllipsisV } from 'react-icons/fa'
import Dropdown from '../shared/Dropdown'
import { ActionButton } from '../shared/ActionButton'

const Navbar = ({ toggleSidebar }) => {
  const logoutUser = useLogout()

  return (
    <nav className="sticky z-5 flex justify-between p-4 text-white bg-red-700">
      <ActionButton icon={FaBars} onClick={toggleSidebar} estilos="p-1" />
      <ActionButton label={'Bienvenido al Sistema de Gestión de Correspondencia'} to={'/home'} estilos="text-xl" />

      {/* {sidebarToggle && (
        <div>
          <Link to="/">Inicio</Link>
          <Link to="/acerca">Acerca</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
      )} */}
      <div className="flex items-center">
        <Dropdown
          icon={FaEllipsisV}
          options={[
            {
              label: 'Mi Perfil',
            },
            {
              label: 'Cerrar Sesión',
              action: logoutUser,
            },
          ]}
        />
      </div>
    </nav>
  )
}

export default Navbar
