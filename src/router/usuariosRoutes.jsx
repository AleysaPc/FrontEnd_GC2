import {lazy} from 'react'

const UserList = lazy(() => import('../data/usuarios/UserList'))
const EditUser = lazy(() => import('../data/usuarios/EditUser'))
const CreateUser = lazy(() => import('../data/usuarios/CreateUser'))
const CreateDepartament = lazy(() => import('../data/usuarios/Departament/CreateDepartament'))
const EditDepartament = lazy(() => import('../data/usuarios/Departament/EditDepartament'))
const DepartamentList = lazy(() => import('../data/usuarios/Departament/DepartamentList'))
const CreateRol = lazy(() => import('../data/usuarios/Rol/CreateRol'))
const RolList = lazy(() => import('../data/usuarios/Rol/RolList'))
const EditRol = lazy(() => import('../data/usuarios/Rol/EditRol'))

export const usuariosRoutes = [
    // usuarios
    { path: "/userList", element: <UserList /> },
    { path: "/editUser/:id", element: <EditUser /> },
    { path: "/createUser", element: <CreateUser /> },
    { path: "/createDepartament", element: <CreateDepartament /> },
    { path: "/editDepartament/:id", element: <EditDepartament /> },
    { path: "/departamentList", element: <DepartamentList /> },
    { path: "/createRol", element: <CreateRol /> },
    { path: "/rolList", element: <RolList /> },
    { path: "/editRol/:id", element: <EditRol /> },
]