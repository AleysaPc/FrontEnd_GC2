import useLogout from '../../hooks/useLogout'
import { FaBars, FaEllipsisV } from 'react-icons/fa'
import Dropdown from '../shared/Dropdown'
import { ActionButton } from '../shared/ActionButton'

const Navbar = ({ toggleSidebar }) => {
  const logoutUser = useLogout()

  return (
    <nav className="sticky z-5 border-blue-500 border-2 flex justify-between p-4">
      <ActionButton icon={FaBars} onClick={toggleSidebar} estilos="p-1" />
      <ActionButton label={'Navbar'} to={'/home'} />

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
