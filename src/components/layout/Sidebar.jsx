import { useState } from 'react'
import SidebarMenu from './SidebarMenu'
import { menus } from '../../data/SidebarData'
import { FaCrown } from 'react-icons/fa'

const Sidebar = ({ isVisible }) => {
  const [openMenu, setOpenMenu] = useState(null)

  return (
    <div
      className={`sticky z-50 shadow w-64 transition-all duration-300 ${
        isVisible ? 'flex flex-col' : 'hidden'
      } h-[calc(100vh)]`}
    >
      {/* titulo */}
      <div className="p-4 px-6 text-center flex items-center gap-2 bg-red-500">
        <FaCrown className="text-white text-2xl" />
        <h1 className="text-white text-xl font-bold">Conquistador</h1>
      </div>

      {/* Sección de Perfil de Usuario */}
      <div className="px-4 py-6 border-b flex flex-col items-center justify-center text-center bg-orange-500">
        {/* Avatar */}
        <div className="mb-3">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xl">
            WF
          </div>
        </div>
        {/* Información del usuario */}
        <div className="text-center">
          <p className="text-sm font-medium text-white">
            William Fabricio Tito Vargas
          </p>
          <p className="text-xs text-white">wil.fabri777@gmail.com</p>
        </div>
      </div>

      {/* Contenedor del menú con scroll */}
      <div className="flex-1 overflow-y-auto">
        <ul className="px-2 space-y-2">
          {menus.map((menu, index) => (
            <SidebarMenu
              key={index}
              title={menu.title}
              icon={menu.icon}
              items={menu.items}
              isOpen={openMenu === menu.title}
              toggleMenu={() =>
                setOpenMenu(openMenu === menu.title ? null : menu.title)
              }
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
